import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Chat from './chat'
import Calendar from './calendar'
import Email from './email'





const AppIndex = ({ match}) =>(
    <Routes>
        <Navigate exact from={`${match.url}/`} to={`${match.url}/tables-basic`} />
        <Route path={`${match.url}/chat`} component={Chat} />                                           
        <Route path={`${match.url}/calendar`} component={Calendar} />                                           
        <Route path={`${match.url}/email`} component={Email} />                                           
        
    </Routes>
)

export default AppIndex