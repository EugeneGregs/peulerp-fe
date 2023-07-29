import {Routes, Route} from 'react-router-dom';
import React from 'react';
import PeopleIndex from '.';
import SupplierList from './SupplierList';
import AddSupplier from './AddSupplier';
import UserList from './UserList';
import AddUser from './AddUser';

const PeopleLayout = () => (
    <Routes>
        <Route path="/" element={<PeopleIndex />} />
        <Route index element={<SupplierList/>} />
        <Route path="/supplierlist-people" element={<SupplierList/>} />
        <Route path="/addsupplier-people" element={<AddSupplier/>} />
        <Route path="/userlist-people" element={<UserList/>} />
        <Route path="/adduser-people" element={<AddUser/>} />
    </Routes>
);

export default PeopleLayout;