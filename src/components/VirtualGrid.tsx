import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { SearchState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Toolbar,
  SearchPanel,
  VirtualTable,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';
import { Loading } from '../theme-sources/material-ui/components/loading';;

type Column = {
  name: string
  title: string
}
interface Props {
  url: string,
  placeholder: string,
  gridColumns: Column[]
}

export const VirtualGrid: React.FunctionComponent<Props> = ({url, gridColumns, placeholder = "Search..."}) => {
  const [columns] = useState(gridColumns);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [lastQuery, setLastQuery] = useState('');

  const getQueryString = () => {
    if (!searchValue) {
      return url;
    }
    return `${url}?customerId=${searchValue}`;
  };

  const loadData = () => {
    const queryString = getQueryString();

    if (queryString !== lastQuery && !loading) {
      setLoading(true);

      fetch(queryString)
        .then(response => response.json())
        .then((data) => {
          const rides = data.map((ride: any, index: number) => {
            return {number: index+1, price: ride.price.value, customerId: ride.key, ridesCount: ride.doc_count};
          });

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
        <SearchState onValueChange={setSearchValue} />

        <VirtualTable />
        <TableHeaderRow />
        <Toolbar />
        <SearchPanel messages={{searchPlaceholder: placeholder}} />

      </Grid>
      {loading && <Loading />}
    </Paper>
  );
};