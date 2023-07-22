import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Basictable from './basictable'
import Datatable from './datatable'





const TableIndex = ({ match}) =>(
    <Routes>
        <Navigate exact from={`${match.url}/`} to={`${match.url}/tables-basic`} />
        <Route path={`${match.url}/tables-basic`} component={Basictable} />                     
        <Route path={`${match.url}/data-tables`} component={Datatable} />                     
        
    </Routes>
)

export default TableIndex