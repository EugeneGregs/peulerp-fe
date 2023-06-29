import React, { useEffect, useState } from "react";
import ProductList from "./productlist";
import OwlCarousel from "react-owl-carousel";
import Product from "./product";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
  Product61,
  Product62,
  Product63,
  Product64,
  Product65,
  Product66,
  Product67,
  Product68,
  Product29,
  Product31,
  Product35,
  Product37,
  Product54,
  Product44,
  Product45,
  Product36,
  Product32,
  Product46,
  Product55,
  Product60,
  Product56,
  Product47,
  Product48,
  Product57,
  Product58,
  Product49,
  Product51,
  Product52,
  Product53,
} from "../../EntryFile/imagePath";

const Posleft = ({ products, categories, updateCart }) => {
  useEffect(() => {
    console.log("Products::::")
    console.log(products)
    console.log("Categories:::")
    console.log(categories)
  }, [])

  const [showList, setShowList] = useState(true);
  const toggleList = () => setShowList(showList);

  return (
    <div className="col-lg-8 col-sm-12 tabs_wrapper">
      <div className="page-header ">
        <div className="page-title">
          <h4>Categories</h4>
          <h6>Manage your Sales</h6>
        </div>
        <div className="page-btn" style={{display: "none"}}>
              <Link
                to="#"
                className="btn btn-added"
                onClick={() => toggleList()}
              >
                Toggle View
              </Link>
            </div>
      </div>
      <div style={{ display: showList ? "block" : "none" }}>
        { products && <ProductList products={products} updateCart={updateCart}/> }
      </div>
      <div style={{ display: !showList ? "block" : "none" }}>
        <ul className=" tabs owl-carousel owl-theme owl-product  border-0 ">
          <OwlCarousel
            className="owl-theme"
            items={categories.length}
            margin={10}
            dots={false}
            nav
          >
            {
              categories.map(category => {
                return (
                  <li id={category.id} key={category.id} className={"item" + categories.indexOf(category) == 0 ? " active" : ""}>
                    <div className="product-details ">
                      <img src={Product62} alt={category.name} />
                      <h6>{category.name}</h6>
                    </div>
                  </li>)
              })
            }
          </OwlCarousel>
        </ul>
        <div className="tabs_container">
          {
            categories.map(category => {
              let catProducts = products.filter(p => p.category.id == category.id);
              return <Product products={catProducts} categoryId={category.id} isActive={categories.indexOf(category) == 0} key={category.id} />
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Posleft;
