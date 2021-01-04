import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from './Home';
import { DataGrid } from './DataGrid';

export const Header: React.FunctionComponent = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/rides'>Rides</Link></li>
                    <li><Link to='/errors'>Errors</Link></li>
                    <li><Link to='/customers'>Customers</Link></li>
                </ul>
            </nav>
        </header>   
    );
}
