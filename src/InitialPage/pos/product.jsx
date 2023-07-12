import React from "react";
import {
    Product29
  } from "../../EntryFile/imagePath";

const Product = ({ products, categoryId, isActive }) => {
    return (
        <div className={"tab_content" + (isActive ? " active" : "")}  data-tab={categoryId}>
            <div className="row ">
                {
                    products.map(product => {
                        return (
                            <div className="col-lg-3 col-sm-6 d-flex " key={product.id}>
                                <div className={"productset flex-fill" + (products.indexOf(product) == 0 ? " active" : "")}>
                                    <div className="productsetimg">
                                        <img src={Product29} alt={product.name} />
                                        <h6>Qty: 5.00</h6>
                                        <div className="check-product">
                                            <i className="fa fa-check" />
                                        </div>
                                    </div>
                                    <div className="productsetcontent">
                                        <h5>{product.category.name}</h5>
                                        <h4>{product.name}</h4>
                                        <h6>{product.sellingPrice}</h6>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Product;