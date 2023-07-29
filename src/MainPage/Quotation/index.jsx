import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import QuotationList from './QuotationList';
import AddQuotation from './AddQuotation';
import EditQuotation from './EditQuotation'

const PurchaseRoute = ({ match}) =>(
    <Routes>
        <Navigate exact from={`${match.url}/`} to={`${match.url}/quotationlist-quotation`} />
        <Route path={`${match.url}/quotationlist-quotation`} component={QuotationList} />
        <Route path={`${match.url}/addquotation-quotation`} component={AddQuotation} />
        <Route path={`${match.url}/editquotation-quotation`} component={EditQuotation} />
    </Routes>
)

export default PurchaseRoute;