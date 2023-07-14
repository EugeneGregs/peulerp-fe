import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import * as Constants from "../../common/Constants";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import Select from "react-select";
import { set } from "react-hook-form";

const baseUrl = Constants.BASE_URL;
const successCodes = Constants.SUCCESS_CODES;

const ManageInventory = () => {
  const { state } = useLocation();
  const [existingStock, setExistingStock] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [reorderLevel, setReorderLevel] = useState(0);
  const [productList, setProductList] = useState([]);
  const [saveType, setSaveType] = useState("post");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    setIsBusy(true);
    fetchProductList();
    if (state) {
      const { stock } = state;
      setExistingStock(stock);
    }
  }, []);

  useEffect(() => {
    console.log(existingStock);
    if (existingStock && existingStock.productId) {
      setSaveType("put");
      setProductId(existingStock.productId);
      setQuantity(existingStock.quantity);
      setReorderLevel(existingStock.reorderLevel);
    }
  }, [existingStock]);

  const fetchProductList = () => {
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        setIsBusy(false);
        if (!successCodes.includes(res.status)) {
          notify("Failed to fetch products", "error", toast);
          return;
        }

        const { data } = res;
        console.log(data);

        const options = data.map((product) => {
          return {
            value: product.id,
            label: product.name,
          };
        });

        setProductList(options);
      })
      .catch((err) => handleError(err));
  };

  //Can be replaced with logic to search locally from stcokList
  const fetchStockByProductId = (productId) => {
    setIsBusy(true);
    axios
      .get(`${baseUrl}/stocks/product/${productId}`)
      .then((res) => {
        setIsBusy(false);
        if (successCodes.includes(res.status)) {
          notify("Product Found, Updating Stock", "success", toast);
          const { data } = res;
          console.log(data);
          setExistingStock(data);
        }
      })
      .catch((err) => handleError(err));
  };

  const handleSubmit = () => {
    setIsBusy(true);
    if (!isInputValid()) return setIsBusy(false);

    const stock = {
      productId: productId,
      quantity: quantity,
      reorderLevel: reorderLevel,
    };

    if (saveType == "put") {
      stock.id = existingStock.id;
    }

    axios
      .post(`${baseUrl}/stocks`, stock)
      .then((res) => handleResponse(res))
      .catch((err) => handleError(err));
  };

  const clearInputs = () => {
    setProductId("");
    setQuantity(0);
    setReorderLevel(0);
  };

  const isInputValid = () => {
    if (!productId) {
      notify("Please select a product", "error", toast);
      return false;
    }

    if (!quantity) {
      notify("Please enter a quantity", "error", toast);
      return false;
    }

    if (!reorderLevel) {
      notify("Please enter a reorder level", "error", toast);
      return false;
    }

    //if the fields are same as existing stock, no need to save
    if (
      productId == existingStock.productId &&
      quantity == existingStock.quantity &&
      reorderLevel == existingStock.reorderLevel
    ) {
      notify("No changes to save", "warning", toast);
      return false;
    }

    return true;
  };

  const handleResponse = (res) => {
    setIsBusy(false);

    if (successCodes.includes(res.status)) {
      notify("Stock Saved Successfully", "success", toast);
      clearInputs();
      return;
    }

    notify("Failed to save stock", "error", toast);
  };

  const handleProductChange = (product) => {
    const { value } = product;
    setProductId(value);
    fetchStockByProductId(value);
  };

  const handleError = (err) => {
    setIsBusy(false);

    if (err.response && err.response.status == 404) {
        setQuantity(0);
        setReorderLevel(0);
        setSaveType("post");
      return;
    }

    console.log(err.message);
    notify("Something Went Wrong", "error", toast);
  };

  return (
    <>
      <Segment>
        <Dimmer active={isBusy} inverted>
          <Loader size="medium">Loading...</Loader>
        </Dimmer>
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Inventory Management</h4>
                <h6>{`${saveType == "post" ? "Add" : "Update"} Stock`}</h6>
              </div>
            </div>
            {/* /add */}
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Product Name</label>
                      <Select
                        value={productList.find(
                          (obj) => obj.value === productId
                        )}
                        onChange={(p) => handleProductChange(p)}
                        options={productList}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        className="form-control"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Reorder Level</label>
                      <input
                        type="number"
                        className="form-control"
                        value={reorderLevel}
                        onChange={(e) => setReorderLevel(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      className="btn btn-submit me-2"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    <button className="btn btn-cancel" onClick={clearInputs}>
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /add */}
          </div>
          <ToastContainer />
        </div>
      </Segment>
    </>
  );
};

export default ManageInventory;
