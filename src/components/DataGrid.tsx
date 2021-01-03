import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { SearchState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Toolbar,
  SearchPanel,
  Table,
  TableHeaderRow,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import { PagingState, CustomPaging } from '@devexpress/dx-react-grid';
import { Loading } from '../theme-sources/material-ui/components/loading';;

type Column = {
  name: string
  title: string
}
interface Props {
  url: string,
  gridColumns: Column[]
}

export const DataGrid: React.FunctionComponent<Props> = ({url, gridColumns}) => {
  const [columns] = useState(gridColumns);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [lastQuery, setLastQuery] = useState('');

  const getQueryString = () => {
    if (!searchValue) {
      return `${url}?size=${pageSize}&from=${pageSize * currentPage}`;
    }
    return `${url}?q=${searchValue}&size=${pageSize}&from=${pageSize * currentPage}`;
  };

  const loadData = () => {
    const queryString = getQueryString();

    if (queryString !== lastQuery && !loading) {
      setLoading(true);

      fetch(queryString)
        .then(response => response.json())
        .then(({rows: data, totalCount}) => {
          const rides = data.map((ride: any, index: number) => {
            return {number: index+1, ...ride._source};
          });

          setTotalCount(totalCount);
          setRows(rides);
          setLoading(false);
        })
        .catch(() => setLoading(false));

      setLastQuery(queryString);
    }
  };

  useEffect(() => loadData());

  return (
    <Paper style={{ position: 'relative' }}>
      <Grid
        rows={rows}
        columns={columns}
      >
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
        />
        <CustomPaging totalCount={totalCount}/>

        <SearchState onValueChange={setSearchValue}/>

        <Table />
        <TableHeaderRow />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
      </Grid>
      {loading && <Loading />}
    </Paper>
  );
};