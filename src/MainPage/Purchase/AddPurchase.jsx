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

const paymentStatus = [
  { value: 1, label: "Paid" },
  { value: 2, label: "Pending" },
  { value: 3, label: "Partial" },
];

const deleteRow = () => {
  $(document).on("click", ".delete-set", function () {
    $(this).parent().parent().hide();
  });
};

const baseUrl = "http://localhost:5071";

const AddPurchase = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [reffereceNo, setReffereceNo] = useState("");
  const [purchaseProducts, setPurchaseProducts] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [editingPrduct, setEditingProduct] = useState({});

  const handSaveEdit = () => {
    let purchasedProductsClone = [...purchaseProducts];
    const index = purchasedProductsClone.findIndex(p => p.id === editingPrduct.id);
    purchasedProductsClone[index] = editingPrduct;
    setPurchaseProducts(purchasedProductsClone);
  }

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

    if(field === "quantity") {
      const { purchasePrice } = editingPrduct;
      setEditingProduct({ ...editingPrduct, quantity: value, totalCost: purchasePrice * value });
    }

    if(field === "purchasePrice") {
      const { quantity } = editingPrduct;
      setEditingProduct({ ...editingPrduct, purchasePrice: value, totalCost: quantity * value });
    }
  }

  useEffect(() => {
    Promise.all([fetchProducts(), fetchSuppliers()]);
    setReffereceNo(generateRefferenceNumber());
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

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="productimgname">
          <Link style={{ fontSize: "15px", marginLeft: "10px" }} to="#">
            {record.name}
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
      render: (text) => `Ksh ${text}`,
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      render: (text) => `Ksh ${text}`,
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Link className="me-3" to="#">
            <img src={EditIcon} alt="img" onClick={() => handleEdit(record)} />
          </Link>
          <Link className="delete-set" to="#" onClick={deleteRow}>
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
              <h6>Add/Update Purchase</h6>
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
                        <Select options={supplierOptions} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Purchase Date </label>
                    <div className="input-groupicon">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
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
                    <Select options={paymentStatus} />
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
                            onChange={(e) => handleDetailsChange(e, "purchasePrice")}
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
                        <h5>ksh. {grandTotal}</h5>
                      </li>
                    </ul>
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
                <div className="col-lg-12">
                  <button className="btn btn-submit me-2">Submit</button>
                  <button className="btn btn-cancel">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPurchase;
