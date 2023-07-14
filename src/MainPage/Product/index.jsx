import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList'
import AddProduct from './AddProduct'
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';
import PrintBarcode from './PrintBarcode';
import ProductDetails from './productDetails';

const ProductRoute = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/productlist-product`} />
        <Route path={`${match.url}/productlist-product`} component={ProductList} />
        <Route path={`${match.url}/addproduct-product`} component={AddProduct} />
        <Route path={`${match.url}/categorylist-product`} component={CategoryList} />
        <Route path={`${match.url}/addcategory-product`} component={AddCategory} />
        <Route path={`${match.url}/printbarcode-product`} component={PrintBarcode} />
        <Route path={`${match.url}/product-details`} component={ProductDetails} />

    </Switch>
)

export default ProductRoute;