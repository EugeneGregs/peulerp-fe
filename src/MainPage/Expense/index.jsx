import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import ExpenseList from './ExpenseList.jsx'
import AddExpense from './AddExpense.jsx';
import EditExpense from './EditExpense.jsx';
import ExpenseCategory from './ExpenseCategory.jsx';

const PurchaseRoute = ({ match}) =>(
    <Routes>
        <Navigate exact from={`${match.url}/`} to={`${match.url}/expenselist-expense`} />
        <Route path={`${match.url}/expenselist-expense`} component={ExpenseList} />
        <Route path={`${match.url}/addexpense-expense`} component={AddExpense} />
        <Route path={`${match.url}/editexpense-expense`} component={EditExpense} />
        <Route path={`${match.url}/expensecategory-expense`} component={ExpenseCategory} />
    </Routes>
)

export default PurchaseRoute;