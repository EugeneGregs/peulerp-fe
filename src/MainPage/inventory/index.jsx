import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import InventoryList from './inventoryList.jsx';
import ManageInventory from './manageInventory.jsx';

const InventoryIndex = ({ match}) =>(
    <Routes>
        <Navigate exact from={`${match.url}/`} to={`${match.url}/inventorylist`} />
        <Route path={`${match.url}/inventorylist`} component={InventoryList} />
        <Route path={`${match.url}/addinventory`} component={ManageInventory} />
    </Routes>
)

export default InventoryIndex;