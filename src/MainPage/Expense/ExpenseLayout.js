import { Route, Routes } from "react-router-dom"
import ExpenseList from './ExpenseList.jsx'
import AddExpense from './AddExpense.jsx';
import ExpenseCategory from './ExpenseCategory.jsx';
import React from "react";
import Expense from "./index.jsx";


const ExpenseLayout = () => {
    return(
        <>
        <Routes>
            <Route path="/" element={<Expense/>}>
                <Route index element={<ExpenseList/>}/>
                <Route path="expenselist-expense" element={<ExpenseList/>}/>
                <Route path="addexpense-expense" element={<AddExpense/>}/>
                <Route path="expensecategory-expense" element={<ExpenseCategory/>} />
            </Route>
        </Routes>
        </>
    )
};

export default ExpenseLayout;