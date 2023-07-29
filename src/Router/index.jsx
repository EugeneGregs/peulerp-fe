import Dashboard from "../MainPage/Dashboard";
import Activities from "../MainPage/Activities";
import Product from '../MainPage/Product/index'
import Sales from '../MainPage/sales'
import Profile from '../MainPage/Profile/index'
import Purchase from "../MainPage/Purchase/index";
import Expense from "../MainPage/Expense/index"
import Quotation from '../MainPage/Quotation/index'
import Transfer from '../MainPage/Transfer/index'
import Return from '../MainPage/Return/index'
import People from '../MainPage/People/index'
import Places from '../MainPage/Places/index'
import Components from '../MainPage/Components/index'
import Elements from '../MainPage/elements'
import Charts from '../MainPage/charts'
import Icons from '../MainPage/icons'
import Forms from '../MainPage/forms'
import Tables from '../MainPage/tables'
import Application from '../MainPage/application'
import Report from '../MainPage/report'
import Users from '../MainPage/users'
import Settings from '../MainPage/settings'
import BlankPage from "../MainPage/BlankPage"
import Inventory from "../MainPage/inventory/index"
import React from "react";
import ProductLayout from "../MainPage/Product/layout";
import ExpenseLayout from "../MainPage/Expense/ExpenseLayout";
import PurchaseLayout from "../MainPage/Purchase/PurchaseLayout";
import InventoryLayout from "../MainPage/inventory/defaultLayout";
import PeopleLayout from "../MainPage/People/PeopleLayout";
import ReportLayout from "../MainPage/report/reportLayout";

export default [
    {
        path: 'dashboard',
        component: <Dashboard/>
    },
    // {
    //     path: 'activities',
    //     component: Activities
    // },
    {
        path: 'product/*',
        component: <ProductLayout/>
    },
    // {
    //     path:'profile',
    //     component: Profile
    // },
    {
        path:'purchase/*',
        component: <PurchaseLayout/>
    },
    {
        path:'expense/*',
        component: <ExpenseLayout/>
    },
    // {
    //     path:'quotation',
    //     component: Quotation
    // },
    // {
    //     path:'transfer',
    //     component: Transfer
    // },
    // {
    //     path:'return',
    //     component: Return
    // },
    {
        path:'people/*',
        component: <PeopleLayout/>
    },
    // {
    //     path:'places',
    //     component: Places
    // },
    // {
    //     path:'components',
    //     component: Components
    // },
    // {
    //     path:'blankpage',
    //     component: BlankPage
    // },
    // {
    //     path:'elements',
    //     component: Elements
    // },
    // {
    //     path:'charts',
    //     component: Charts
    // },
    // {
    //     path:'icons',
    //     component: Icons
    // },
    // {
    //     path:'forms',
    //     component: Forms
    // },
    // {
    //     path:'table',
    //     component: Tables
    // },
    // {
    //     path:'application',
    //     component: Application
    // },
    {
        path:'report/*',
        component: <ReportLayout/>
    },
    // {
    //     path:'users',
    //     component: Users
    // },
    // {
    //     path:'settings',
    //     component: Settings
    // },
    {
        path:'inventory/*',
        component: <InventoryLayout/>
    },
    // {
    //     path:'sales',
    //     component: Sales
    // },
    
   
    
]