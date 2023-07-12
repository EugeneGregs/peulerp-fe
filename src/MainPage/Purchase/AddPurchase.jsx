import React, { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Scanner,
  DeleteIcon,
  EditIcon,
  MacbookIcon,
  EarpodIcon,
} from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-select2-wrapper/css/select2.css";
import Table from "../../EntryFile/datatable";
import Select from "react-select";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import * as Constants from "../../common/Constants";

const paymentStatusOptions = [
  { value: 1, label: "Paid" },
  { value: 2, label: "Pending" },
  { value: 3, label: "Partial" },
];

const baseUrl = Constants.BASE_URL;

const AddPurchase = () => {
  const { state } = useLocation();
  const [purchase, setPurchase] = useState({});
  const [products, setProducts] = useState([]);
  const [saveType, setSaveType] = useState("post");
  const [productOptions, setProductOptions] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [reffereceNo, setReffereceNo] = useState("");
  const [purchaseProducts, setPurchaseProducts] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [editingPrduct, setEditingProduct] = useState({});
  const [supplierId, setSupplierId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(1);
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [purchaseDescription, setPurchaseDescription] = useState("");

  const handSaveEdit = () => {
    let purchasedProductsClone = [...purchaseProducts];
    const index = purchasedProductsClone.findIndex(
      (p) => p.id === editingPrduct.id
    );
    purchasedProductsClone[index] = editingPrduct;
    setPurchaseProducts(purchasedProductsClone);
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setEditingProduct({});
  };

  const handleShow = () => setShow(true);

  const handleEdit = (product) => {
    setEditingProduct(product);
    handleShow();
  };

  const handleDetailsChange = (e, field) => {
    const { value } = e.target;

    if (field === "quantity") {
      const { purchasePrice } = editingPrduct;
      setEditingProduct({
        ...editingPrduct,
        quantity: +value,
        totalCost: purchasePrice * value,
      });
    }

    console.log(editingPrduct);

    if (field === "purchasePrice") {
      const { quantity } = editingPrduct;
      setEditingProduct({
        ...editingPrduct,
        purchasePrice: +value,
        totalCost: quantity * value,
      });   
    }
  };

  useEffect(() => {
    console.log(editingPrduct);
  }, [editingPrduct]);

  useEffect(() => {
    if(state && state.purchase){
      const { purchase } = state;
      purchase.purchaseProducts.forEach((purchaseProduct) => {
        purchaseProduct.totalCost =
          purchaseProduct.quantity * purchaseProduct.purchasePrice;
        purchaseProduct.id = purchaseProduct.productId;
      })
      setPurchase(purchase)
      setSaveType("put")
      setReffereceNo(purchase.refferenceNo)
      setSupplierId(purchase.supplierId)
      setPaymentStatus(purchase.paymentStatus === "Paid" ? 1 : purchase.paymentStatus === "Pending" ? 2 : 3)
      setPurchaseDate(new Date(purchase.purchaseDate))
      setPurchaseDescription(purchase.description)
      setPurchaseProducts(purchase.purchaseProducts)
      setGrandTotal(purchase.amount)
    } else{
      setReffereceNo(generateRefferenceNumber());
    }

    Promise.all([fetchProducts(), fetchSuppliers()]);
  }, []);

  const generateRefferenceNumber = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
      .replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      )
      .substring(25)
      .toUpperCase();

  useEffect(() => {
    console.log(products);
    let options = products.map((product) => {
      return { value: product.id, label: product.name };
    });
    setProductOptions(options);
    console.log(options);
  }, [products]);

  useEffect(() => {
    let supplierOptions = supplier.map((supplier) => {
      return { value: supplier.id, label: supplier.name };
    });
    setSupplierOptions(supplierOptions);
  }, [supplier]);

  const fetchProducts = async () => {
    const productsRes = await axios(`${baseUrl}/products`);
    const products = productsRes.data;
    setProducts([...products]);
    console.log(products);
  };

  const fetchSuppliers = async () => {
    const suppliersRes = await axios(`${baseUrl}/suppliers`);
    const suppliers = suppliersRes.data;
    setSupplier([...suppliers]);
    console.log(suppliers);
  };

  const addProduct = (productOption) => {
    let product = products.find((product) => product.id == productOption.value);
    let purchaseProduct = {
      id: productOption.value,
      name: product.name,
      quantity: 1,
      reorderLevel: 5,
      purchasePrice: product.buyingPrice,
    };
    purchaseProduct.totalCost =
      purchaseProduct.quantity * purchaseProduct.purchasePrice;
    setPurchaseProducts([...purchaseProducts, purchaseProduct]);
    setSelectedProduct(null);
  };

  useEffect(() => {
    let total = 0;
    purchaseProducts.forEach((purchaseProduct) => {
      total += purchaseProduct.totalCost;
    });

    setGrandTotal(total);
  }, [purchaseProducts]);

  const handleSubmitPurchase = () => {
    //vlaidate purchase details
    if (!validatePurchaseDetails()) return

    //Build Purchase object
    const stockList = purchaseProducts.map((purchaseProduct) => {
      return {
        productId: purchaseProduct.id,
        quantity: purchaseProduct.quantity,
        purchasePrice: purchaseProduct.purchasePrice,
        reorderLevel: purchaseProduct.reorderLevel,
      };
    });

    const purchase = {
      refferenceNo: reffereceNo,
      supplierId: supplierId,
      purchaseDate: purchaseDate,
      paymentStatus: paymentStatus,
      amount: grandTotal,
      purchaseProducts: stockList,
      description: purchaseDescription,
    };

    console.log(purchase);
    console.log(JSON.stringify(purchase));

    //post purchase
    postPurchase(purchase).catch((err) => {
      console.log(err);
      notify("Purchase failed", "error", toast);
    });
  };

  const validatePurchaseDetails = () => {
    if (purchaseProducts.length === 0) {
      notify("Please add products to purchase", "error", toast);
      return false;
    }

    if (supplierId === "") {
      notify("Please select supplier", "error", toast);
      return false;
    }

    if (paymentStatus === "") {
      notify("Please select payment status", "error", toast);
      return false;
    }

    if (purchaseDate === "") {
      notify("Please select purchase date", "error", toast);
      return false;
    }

    return true;
  }

  const handleDelete = (product) => {
    let purchaseProductsClone = [...purchaseProducts];
    const index = purchaseProductsClone.findIndex((p) => p.id === product.id);
    purchaseProductsClone.splice(index, 1);
    setPurchaseProducts(purchaseProductsClone);
  }

  const clearPurchase = () => {
    setPurchaseProducts([]);
    setGrandTotal(0);
    setReffereceNo(generateRefferenceNumber());
    setSupplierId("");
    setPaymentStatus(1);
    setPurchaseDate(new Date());
    setPurchaseDescription("");
  }

  const postPurchase = async (currentPurchase) => {
    if(saveType === "put"){
      console.log("putting purchase")
      console.log(purchase)
      currentPurchase.id = purchase.id;
    }
    const res = await axios.post(`${baseUrl}/purchases`, currentPurchase);
    console.log(res);
    if (res.status === 200 || res.status === 201) {
      notify("Purchase saved successfully", "success", toast);
      clearPurchase();
    } else {
      notify("Error saving purchase", "error", toast);
    }
  };

  const columns = [
    {
      title: "Product Name",
      render: (text, record) => (
        <div className="productimgname">
          <Link style={{ fontSize: "15px", marginLeft: "10px" }} to="#">
            {record.name || record.productName}
          </Link>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Unit cost",
      dataIndex: "purchasePrice",
      render: (text) => `Ksh. ${text.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`,
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      render: (text, record) => `Ksh. ${(record.purchasePrice * record.quantity).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`,
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Link className="me-3" to="#">
            <img src={EditIcon} alt="img" onClick={() => handleEdit(record)} />
          </Link>
          <Link className="delete-set" to="#" onClick={handleDelete}>
            <img src={DeleteIcon} alt="img" />
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Purchase Add</h4>
              <h6>{saveType == "post" ? "Add" : "Update" } Purchase</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Supplier Name</label>
                    <div className="row">
                      <div className="col-lg-10 col-sm-10 col-10">
                        <Select
                          options={supplierOptions}
                          onChange={(s) => setSupplierId(s.value)}
                          value={supplierOptions.find((obj) => obj.value === supplierId)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Purchase Date </label>
                    <div className="input-groupicon">
                      <DatePicker
                        selected={purchaseDate}
                        onChange={(date) => setPurchaseDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                      />
                      <div className="addonset">
                        <img src={Calendar} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Reference No.</label>
                    <input type="text" value={reffereceNo} readOnly />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Payment Status</label>
                    <Select
                      options={paymentStatusOptions}
                      onChange={(ps) => setPaymentStatus(ps.value)}
                      value={paymentStatusOptions.find((obj) => obj.value === paymentStatus)}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Product Name</label>
                    <div className="input-groupicon">
                      <Select
                        options={productOptions}
                        onChange={(option) => addProduct(option)}
                        value={selectedProduct}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="table-responsive">
                  <Table columns={columns} dataSource={purchaseProducts} />
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{`Edit ${editingPrduct.name}`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="form-group">
                        <label>Product Name</label>
                        <div className="input-groupicon">
                          <input
                            type="text"
                            value={editingPrduct.name}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Product Quantity</label>
                        <div className="input-groupicon">
                          <input
                            type="number"
                            value={editingPrduct.quantity}
                            onChange={(e) => handleDetailsChange(e, "quantity")}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Unit Cost</label>
                        <div className="input-groupicon">
                          <input
                            type="number"
                            value={editingPrduct.purchasePrice}
                            onChange={(e) =>
                              handleDetailsChange(e, "purchasePrice")
                            }
                            className="form-control"
                          />
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={handSaveEdit}
                      >
                        Save Changes
                      </button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 float-md-right">
                  <div className="total-order">
                    <ul>
                      <li className="total">
                        <h4>Grand Total</h4>
                        <h5>ksh. {grandTotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control"
                    value={purchaseDescription}
                    onChange={(e) => setPurchaseDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-submit me-2" onClick={handleSubmitPurchase}>Submit</button>
                  <button className="btn btn-cancel" onClick={clearPurchase}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddPurchase;
