import React, { useEffect, useState } from "react";
import Header from "./posheader";
import { Link } from "react-router-dom";
import POS from "./posleft";
import "react-select2-wrapper/css/select2.css";
import CartComponent from "./cartcomponent";
import { ToastContainer, toast } from "react-toastify";
import { notify } from "../../common/ToastComponent";
import {
  wallet1,
  transcation,
  trash12,
  scan,
  Edit6,
  pause1,
  debitcard,
  cash,
  scanner1,
} from "../../EntryFile/imagePath";
import Loader from "react-js-loader";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const Pos = () => {
  const paymentTypes = ["Mobile", "Cash", "Bank"];
  const [transactionId, setTransactionId] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [runningCost, setRunningCost] = useState(0);
  const [cartItemsCount, setcartItemsCount] = useState(0);
  const [totalMargin, setTotalMargin] = useState(0);
  const [runningMargin, setRunningMargin] = useState(0);
  const [paymentTye, setPaymentType] = useState("");
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const API = usePrivateAxios();

  const updateCart = (prod, action) => {
    let currentCartContent = [...cartProducts];
    let index = currentCartContent.findIndex((cp) => cp.product.id == prod.id);
    let cartProduct;
    let costOfItems = totalCost;
    let currentCount = cartItemsCount;
    let currentMargin = totalMargin;
    let productMargin;

    if (index >= 0) {
      cartProduct = currentCartContent[index];
      productMargin = computeMargin(cartProduct);
    }

    if (action == "pop" && cartProduct) {
      let removedItem = currentCartContent.splice(index, 1)[0];
      costOfItems -= removedItem.quantity * removedItem.product.sellingPrice;
      currentMargin -= removedItem.quantity * productMargin;
      currentCount--;
    }

    if (action == "decrement") {
      cartProduct.quantity == 1
        ? currentCartContent.splice(index, 1)
        : cartProduct.quantity--;
      costOfItems -= cartProduct.product.sellingPrice;
      currentMargin -= productMargin;
      currentCount--;
    }

    if (action == "push") {
      if (cartProduct) {
        cartProduct.quantity++;
      } else {
        cartProduct = { product: prod, quantity: 1 };
        productMargin = computeMargin(cartProduct);
        currentCartContent.push(cartProduct);
      }

      costOfItems += cartProduct.product.sellingPrice;
      currentCount++;
      currentMargin += productMargin;
    }

    setCartProducts([...currentCartContent]);
    setTotalCost(costOfItems);
    setcartItemsCount(currentCount);
    setTotalMargin(currentMargin);
  };

  const computeMargin = (cp) =>
    cp.product.sellingPrice - cp.product.buyingPrice;

  const clearCart = () => {
    setCartProducts([]);
    setTotalCost(0);
    setcartItemsCount(0);
    setTotalMargin(0);
  };

  const initializeProducts = () => {
    setBusy(true);
    const fetchProducts = async () => {
      API.get(`/products`).then((res) => {
        const resData = res.data;
        let prods = resData
          ? [
              ...resData.map((p) => {
                return {
                  name: p.name,
                  sellingPrice: p.sellingPrice,
                  buyingPrice: p.buyingPrice,
                  barCode: p.barCode,
                  category: {
                    name: p.productCategory.name,
                    id: p.productCategory.id,
                  },
                  id: p.id,
                };
              }),
            ]
          : [];
        let cats = [];
        prods.forEach((p) => {
          if (!cats.find((c) => c.id == p.category.id)) {
            cats.push(p.category);
          }
        });
        setProducts([...prods]);
        setCategories([...cats]);
        setBusy(false);
      });
    };

    fetchProducts().catch((reson) => console.log(reson));
  };

  useEffect(() => {
    initializeProducts();
    setTransactionId(generateTransactionId());
    jQuery(function () {
      $("ul.tabs li").on("click", function () {
        console.log("Clicked!");
        var $this = $(this);
        var $theTab = $(this).attr("id");
        console.log("theTab::");
        console.log($theTab);
        if ($this.hasClass("active")) {
          // do nothing
        } else {
          $this
            .closest(".tabs_wrapper")
            .find("ul.tabs li, .tabs_container .tab_content")
            .removeClass("active");
          $(
            '.tabs_container .tab_content[data-tab="' +
              $theTab +
              '"], ul.tabs li[id="' +
              $theTab +
              '"]'
          ).addClass("active");
        }
      });
      $(document).on("click", ".productset", function () {
        $(this).toggleClass("active");
      });
    });
  }, []);

  useEffect(() => {
      setRunningCost(totalCost - discount);
      setRunningMargin(totalMargin - discount);  
  }, [discount]);

  useEffect(() => {
    setRunningCost(totalCost - discount);
    setRunningMargin(totalMargin - discount);
  },[totalCost]);

  const generateTransactionId = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
      .replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      )
      .substring(25)
      .toUpperCase();

  const createTransaction = () => {
    return {
      cartItems: [
        ...cartProducts.map((p) => {
          return { productId: p.product.id, quantity: p.quantity };
        }),
      ],
      paymentType: paymentTye,
      orderNumber: transactionId,
      tellerId: "00000000-0000-0000-0000-000000000000",
      discount: discount,
      customerId: "00000000-0000-0000-0000-000000000000",
      totalCost: runningCost,
      totalMargin: runningMargin,
    };
  };

  const HandleCheckout = () => {
    const trans = createTransaction();
    if (ValidateTransaction(trans)) {
      console.log(trans);
      API
        .post(`/transaction`, trans)
        .then(handleResponse)
        .catch(handleError);
    }
  };

  const handleResponse = (res) => {   
    clearFields();
    notify(
      `Transaction Of Id: ${res.data.orderNumber} Sent!`,
      "success",
      toast
    );
  };

  const clearFields = () => {
    clearCart();
    setTransactionId(generateTransactionId());
    setPaymentType("");
    setAmount(0);
    setDiscount(0);
    setRunningCost(0);
    setRunningMargin(0);
  };

  const handleError = (res) => {
    console.log("POST RES::");
    console.log(res.data);
    notify(`Transaction Failed, Please Try Again`, "error", toast);
  };

  const ValidateTransaction = (trans) => {
    console.log(trans);
    if (!trans.cartItems.length) {
      notify("Empty Cart!", "warning", toast);
      return false;
    } else if (!trans.paymentType) {
      notify("Select Payment Type!", "warning", toast);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="main-wrappers">
        <Header />
        <div className="page-wrapper ms-0">
          <div className="content">
            <div className="row">
              {isBusy && (
                <div className={"item"}>
                  {" "}
                  <Loader
                    type="spinner-default"
                    bgColor={"#FFFFFF"}
                    title={"spinner-default"}
                    color={"#FFFFFF"}
                    size={100}
                  />{" "}
                </div>
              )}
              {!isBusy && (
                <POS
                  products={products}
                  categories={categories}
                  updateCart={updateCart}
                />
              )}
              <div className="col-lg-4 col-sm-12 ">
                <div className="order-list">
                  <div className="orderid">
                    <h4>Order List</h4>
                    <h5>Transaction id : {transactionId}</h5>
                  </div>
                </div>
                <div className="card card-order">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="text-end">
                          <Link to="#" className="btn btn-scanner-set">
                            <img src={scanner1} alt="img" className="me-2" />
                            Scan bardcode
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0">
                    <div className="totalitem">
                      <h4>Total items : {cartItemsCount}</h4>
                      <h4>Current Margin : {runningMargin}</h4>
                      <Link to="#" onClick={() => clearCart()}>
                        Clear all
                      </Link>
                    </div>
                    <div className="product-table">
                      {products.length &&
                        cartProducts.map((cp) => (
                          <CartComponent
                            cartProduct={cp}
                            updateCart={updateCart}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0 pb-2">
                    <div className="setvalue">
                      <ul>
                        <li className="total-value">
                          <h5>Total</h5>
                          <h6>Ksh. {runningCost}.00</h6>
                        </li>
                        <li className="total-value">
                          <h5>Discount</h5>
                          <input
                            className="form-control"
                            style={{marginRight: "0", marginLeft: "60%"}}
                              type="text"
                              onBlur={(e) => setDiscount(+e.target.value)}
                            />
                        </li>
                        <div
                          style={{
                            display:
                              paymentTye == paymentTypes[1] ? "block" : "none",
                          }}
                        >
                          <li className="total-value">
                            <h5>Amount </h5>
                            <input
                            className="form-control"
                            style={{marginRight: "0", marginLeft: "60%"}}
                              type="text"
                              value={amount}
                              onChange={(e) => setAmount(+e.target.value)}
                              required
                            />
                          </li>
                          <li className="total-value">
                            <h5>Change </h5>
                            <h6>Ksh. {amount - totalCost}</h6>
                          </li>
                        </div>
                      </ul>
                    </div>
                    <div className="setvaluecash">
                      <ul>
                        <li>
                          <Link
                            to="#"
                            className="paymentmethod"
                            style={{
                              backgroundColor:
                                paymentTye == paymentTypes[1]
                                  ? "#7367F0"
                                  : "#fff",
                              color:
                                paymentTye == paymentTypes[1] ? "#fff" : "#000",
                            }}
                            onClick={() => setPaymentType(paymentTypes[1])}
                          >
                            <img src={cash} alt="img" className="me-2" />
                            Cash
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="paymentmethod"
                            style={{
                              backgroundColor:
                                paymentTye == paymentTypes[0]
                                  ? "#7367F0"
                                  : "#fff",
                              color:
                                paymentTye == paymentTypes[0] ? "#fff" : "#000",
                            }}
                            onClick={() => setPaymentType(paymentTypes[0])}
                          >
                            <img src={scan} alt="img" className="me-2" />
                            Mpesa
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="paymentmethod"
                            style={{
                              backgroundColor:
                                paymentTye == paymentTypes[2]
                                  ? "#7367F0"
                                  : "#fff",
                              color:
                                paymentTye == paymentTypes[2] ? "#fff" : "#000",
                            }}
                            onClick={() => setPaymentType(paymentTypes[2])}
                          >
                            <img src={debitcard} alt="img" className="me-2" />
                            Card
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <Link
                      className="btn-totallabel"
                      to="#"
                      onClick={HandleCheckout}
                    >
                      <h5>Checkout</h5>
                      <h6>Ksh. {runningCost}.00</h6>
                    </Link>
                    <div className="btn-pos">
                      <ul>
                        <li>
                          <Link to="#" className="btn">
                            <img src={pause1} alt="img" className="me-1" />
                            Hold
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="btn">
                            <img src={Edit6} alt="img" className="me-1" />
                            Quotation
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="btn">
                            <img src={trash12} alt="img" className="me-1" />
                            Void
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="btn">
                            <img src={wallet1} alt="img" className="me-1" />
                            Payment
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#recents"
                          >
                            <img src={transcation} alt="img" className="me-1" />{" "}
                            Transaction
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="create"
        tabIndex={-1}
        aria-labelledby="create"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Country</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Link to="#" className="btn btn-submit me-2">
                  Submit
                </Link>
                <Link to="#" className="btn btn-cancel" data-bs-dismiss="modal">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Pos;
