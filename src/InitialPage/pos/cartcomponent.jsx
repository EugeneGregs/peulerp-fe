import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {
    Product34,
    wallet1,
    transcation,
    trash12,
    scan,
    Edit6,
    pause1,
    debitcard,
    cash,
    Product30,
    Product31,
    Product35,
    delete2,
    ellipise1,
    scanner1,
  } from "../../EntryFile/imagePath";

const CartComponent = ({ cartProduct, updateCart }) => {

    return (
        <>
            <ul className="product-lists">
                <li>
                    <div className="productimg">
                        <div className="productimgs">
                            <img src={Product30} alt="img" />
                        </div>
                        <div className="productcontet">
                            <h4>{cartProduct.product.name}</h4>
                            <div className="productlinkset">
                                <h5>{cartProduct.product.barCode}</h5>
                            </div>
                            <div className="increment-decrement">
                                <div className="input-groups">
                                    <input
                                        onClick={() => updateCart(cartProduct.product, "decrement")}
                                        type="button"
                                        defaultValue="-"
                                        className="button-minus dec button"
                                    />
                                    <input
                                        type="text"
                                        name="child"
                                        value={cartProduct.quantity}
                                        className="quantity-field"
                                    />
                                    <input
                                        onClick={() => updateCart(cartProduct.product, "push")}
                                        type="button"
                                        defaultValue="+"
                                        className="button-plus inc button "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>{cartProduct.product.sellingPrice}</li>
                <li>
                    <Link
                        to="#"
                        className="confirm-text"
                        onClick={() => updateCart(cartProduct.product, "pop")}
                    >
                        <img src={delete2} alt="img" />
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default CartComponent;