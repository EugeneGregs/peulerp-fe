import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Excel, Upload, PlusIcon } from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import axios from "axios";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import * as xlsx from "xlsx";
import Table from "../../EntryFile/datatable";
import * as Constants from "../../common/Constants";

const baseUrl = Constants.BASE_URL;

const AddProduct = () => {
  let product = {};
  const location = useLocation();
  const state = location.state;
  const [saveType, setSaveType] = useState("post");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCode, setProductCode] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [isBulkUpload, setIsBulkUpload] = useState(false);
  const [productList, setProductList] = useState([]);
  const [stockQuantity, setStockQuantity] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");

  //Load product categories
  useEffect(() => {
    const fetchData = async () => {
      axios.get(`${baseUrl}/productcategory`).then((res) => {
        const resData = res.data.map((category) => {
          return { id: category.id, name: category.name, text: category.name };
        });
        setCategories([...resData]);
      });
    };

    fetchData().catch(console.log(console.error));
  }, []);

  useEffect(() => {
    console.log("Here");
    categories.length && initializeForm();
  }, [categories]);

  const toggleBulckUpload = () => setIsBulkUpload(!isBulkUpload);

  const initializeForm = () => {
    if (state) {
      const { product } = state;
      setProductName(product.name);
      setProductCategory(product.productCategory.id);
      setProductCode(product.barCode);
      setSellingPrice(product.sellingPrice);
      setBuyingPrice(product.buyingPrice);
      setSaveType("update");
    }
  };

  const SaveProduct = (product) => {
    if (saveType == "post") {
      product.quantity = stockQuantity;
      product.reorderLevel = reorderLevel;
      axios
        .post(`${baseUrl}/products`, product)
        .then(handleResponse)
        .catch(handleError);
    } else {
      console.log(product.id);
      axios
        .put(`${baseUrl}/products/${product.id}`, product)
        .then(handleResponse)
        .catch(handleError);
    }
  };

  const saveProducts = () => {
    const productListToPost = [];
    for (let product of productList) {
      const newProduct = {
        Name: product.Name,
        BarCode: product.BarCode,
        SellingPrice: product.SellingPrice,
        CategoryId: product.CategoryId,
        BuyingPrice: product.BuyingPrice,
        Quantity: product.Quantity,
        ReorderLevel: product.ReorderLevel,
      };

      productListToPost.push(newProduct);
    }

    axios
      .post(`${baseUrl}/products/colection`, productListToPost)
      .then((res) => {
        notify("Products Added Successfully!", "success", toast);
      })
      .catch((err) => {
        console.log(err);
        notify("Error Adding Products!", "error", toast);
      });
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);
        populateProductList(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const populateProductList = (uploadedProducts) => {
    const localProductList = [];
    for (let product of uploadedProducts) {
      const productCategory = categories.find(
        (category) =>
          category.name.toLowerCase() == product.category.toLowerCase()
      );

      if (!productCategory)
        return notify(`Category ${product.category} not found`, "error", toast);

      const newProduct = {
        Name: product.name,
        BarCode: product.barCode.toString(),
        SellingPrice: product.sellingPrice,
        CategoryId: productCategory.id,
        BuyingPrice: product.buyingPrice,
        Category: productCategory.name,
        Quantity: product.quantity,
        ReorderLevel: product.reorderLevel,
      };
      localProductList.push(newProduct);
    }

    setProductList(localProductList);
  };

  const handleResponse = (res) => {
    console.log("POST RES::");
    console.log(res.data);
    notify(
      `${productName} ${
        saveType == "post" ? "Added" : "Updated"
      } Successfully!`,
      "success",
      toast
    );
    clearInputs();
  };

  const handleError = (res) => {
    console.log("POST RES::");
    console.log(res.data);
    notify(
      `Error ${saveType == "post" ? "Adding" : "Updating"} ${productName}`,
      "error",
      toast
    );
    clearInputs();
  };

  const handleSave = () => {
    if (isInputsVaid()) {
      if (isBulkUpload) return saveProducts();

      product = {
        Name: productName,
        BarCode: productCode,
        SellingPrice: sellingPrice,
        CategoryId: productCategory,
        BuyingPrice: buyingPrice,
      };

      if (saveType == "update") {
        product.id = state.product.id;
      }

      //Post Products
      console.log(product);
      SaveProduct(product);
    }
  };

  const isInputsVaid = () => {
    if (isBulkUpload) {
      if (!productList.length)
        return notify("Please upload a file", "error", toast);

      return true;
    }

    if (!productName) return notify("Product Name is required", "error", toast);

    if (!productCode) return notify("Product Code is required", "error", toast);

    if (!productCategory)
      return notify("Product Category is required", "error", toast);

    if (!sellingPrice)
      return notify("Selling Price is required", "error", toast);

    if (!buyingPrice) return notify("Buying Price is required", "error", toast);

    return true;
  };

  const clearInputs = () => {
    setProductCategory("");
    setProductCode("");
    setProductName("");
    setSellingPrice("");
    setBuyingPrice("");
    setStockQuantity("");
    setReorderLevel("");
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "Name",
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Code",
      dataIndex: "BarCode",
      sorter: (a, b) => a.BarCode.length - b.BarCode.length,
    },
    {
      title: "Category",
      dataIndex: "Category",
      sorter: (a, b) => a.Category.length - b.Category.length,
    },
    {
      title: "Buying Price",
      dataIndex: "BuyingPrice",
      sorter: (a, b) => a.BuyingPrice.length - b.BuyingPrice.length,
    },
    {
      title: "Sell Price",
      dataIndex: "SellingPrice",
      sorter: (a, b) => a.SellingPrice.length - b.SellingPrice.length,
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      sorter: (a, b) => a.Quantity.length - b.Quantity.length,
    },
    {
      title: "Reorder Level",
      dataIndex: "ReorderLevel",
      sorter: (a, b) => a.ReorderLevel.length - b.ReorderLevel.length,
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>{saveType == "post" ? "Add" : "Update"} Product</h4>
            </div>
            <div
              className="page-btn"
              style={{ display: saveType == "post" ? "block" : "none" }}
            >
              <Link
                to="#"
                className="btn btn-added"
                onClick={toggleBulckUpload}
              >
                <img
                  src={isBulkUpload ? PlusIcon : Excel}
                  alt="img"
                  className="me-1"
                />
                {isBulkUpload ? "Add Product" : "Upload Products"}
              </Link>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div style={{ display: isBulkUpload ? "none" : "block" }}>
                <div className="row">
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Category</label>
                      <Select2
                        className="select"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        data={categories}
                        options={{
                          placeholder: "Choose Category",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Product Code</label>
                      <input
                        type="text"
                        value={productCode}
                        onChange={(e) => setProductCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>     
                </div>
                <div className="row">
                 <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Selling Price</label>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Buying Price</label>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        value={buyingPrice}
                        onChange={(e) => setBuyingPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Reorder Level</label>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        value={reorderLevel}
                        onChange={(e) => setReorderLevel(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea className="form-control" defaultValue={""} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row"
                style={{
                  display:
                    isBulkUpload && !productList.length ? "block" : "none",
                }}
              >
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> Product Image</label>
                    <div className="image-upload">
                      <input type="file" onChange={readUploadFile} />
                      <div className="image-uploads">
                        <img src={Upload} alt="img" />
                        <h4>Drag and drop a file to upload</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                {isBulkUpload && productList.length && (
                  <Table columns={columns} dataSource={productList} />
                )}
              </div>
            </div>
            <div className="card-footer">
              <div className="col-lg-12">
                <button className="btn btn-submit me-2" onClick={handleSave}>
                  Submit
                </button>
                <button className="btn btn-cancel">Cancel</button>
              </div>
            </div>
          </div>
          {/* /add */}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default AddProduct;
