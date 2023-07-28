import { Routes, Route } from "react-router";
import Product from "./index";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import React from "react";

const ProductLayout = () => {
  return (
    <>
      <Routes>
        <Route index element={<Product />} />
        <Route path="productlist-product" element={<ProductList />} />
        <Route path="addproduct-product" element={<AddProduct />} />
        <Route path="categorylist-product" element={<CategoryList />} />
        <Route path="addcategory-product" element={<AddCategory />} />
      </Routes>
    </>
  );
};

export default ProductLayout;
