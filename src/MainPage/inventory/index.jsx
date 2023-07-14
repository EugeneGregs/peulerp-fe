import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import InventoryList from './inventoryList.jsx';
import ManageInventory from './manageInventory.jsx';

const InventoryIndex = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/inventorylist`} />
        <Route path={`${match.url}/inventorylist`} component={InventoryList} />
        <Route path={`${match.url}/addinventory`} component={ManageInventory} />
    </Switch>
)

export default InventoryIndex;