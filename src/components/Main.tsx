import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from './Home';
import { DataGrid } from './DataGrid';
import { VirtualGrid } from './VirtualGrid';

export const Main: React.FunctionComponent = () => {
  const errorsColumns = [
    { name: 'number', title: '#' },
    { name: 'customerId', title: 'Customer Id' },
    { name: 'startTime', title: 'Start Time' },
    { name: 'endTime', title: 'End Time' },
    { name: 'zone', title: 'Zone' },
    { name: 'fileName', title: 'File Name' }
  ];
  const ridesColumns = [
    ...errorsColumns,
    { name: 'price', title: 'Price' },
    { name: 'currency', title: 'Currency' },
    { name: 'minutes', title: 'Minutes' }
  ];
  const customerColumns = [
    { name: 'number', title: '#' },
    { name: 'customerId', title: 'Customer Id' },
    { name: 'price', title: 'Expenses' },
    { name: 'ridesCount', title: 'Rides Count' },
  ]

  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/rides' component={() => <DataGrid gridColumns={ridesColumns} url="http://localhost:3000/api/search-rides"/>}/>
        <Route path='/errors' component={() => <DataGrid gridColumns={errorsColumns} url="http://localhost:3000/api/search-errors" />}/>
        <Route path='/customers' component={() => <VirtualGrid gridColumns={customerColumns} url="http://localhost:3000/api/customers" placeholder="Search by customer id" />}/>
      </Switch>
    </main>
  )
}