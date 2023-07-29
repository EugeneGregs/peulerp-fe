import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import EmployeeProfile from './EmployeeProfile';

const ProfileIndex = ({ match}) =>(
    <Routes>
        <Navigate exact from={`${match.url}/`} to={`${match.url}/user-profile`} />
        <Route path={`${match.url}/user-profile`} component={EmployeeProfile} />
    </Routes>
)

export default ProfileIndex