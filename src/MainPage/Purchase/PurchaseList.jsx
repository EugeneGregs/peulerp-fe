import React, { useState, useEffect } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import {
  Excel,
  PlusIcon,
  search_whites,
  EditIcon,
  DeleteIcon,
} from "../../EntryFile/imagePath";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const PurchaseList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [purchaseList, setPurchaseList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [updatedPurchaseList, setUpdatedPurchaseList] = useState([]);
  const [isBusy, setBusy] = useState(false);
  const [supplierList, setSupplierList] = useState([]);
  const [currentPoductList, setCurrentProductList] = useState([]);
  const [show, setShow] = useState(false);
  const API = usePrivateAxios();
  const BASE_PATH = "/purchases";

  useEffect(() => {
    const fetchData = async () => {
      setBusy(true);
      fetchProducts().then(() => {
        fetchSuppliers();
      })
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setShow(false);
    setEditingProduct({});
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log("purchaseList");
    console.log(purchaseList);
    console.log("productList");
    console.log(productList);
    let purchaseListCopy = [...purchaseList];
    purchaseListCopy.forEach((purchase) => {
      purchase.purchaseProducts.map((purchaseProduct) => {
        const product = productList.find(
          (product) => product.id === purchaseProduct.productId
        );
        purchaseProduct.productName = product?.name;
        purchaseProduct.barCode = product.barCode;
        purchaseProduct.productCategory = product.productCategory?.name;
        purchaseProduct.purchasePrice = product.buyingPrice;
      });
    });
    setUpdatedPurchaseList([...purchaseListCopy]);
    setBusy(false);
  }, [purchaseList]);

  const fetchSuppliers = async () => {
    const suppliersRes = await API.get(`/suppliers`);
    const suppliers = suppliersRes.data;
    setSupplierList([...suppliers]);
  };

  useEffect(() => {
    console.log(supplierList);
    supplierList.length && fetchPurchases();
  }, [supplierList]);

  const fetchProducts = async () => {
    const productsRes = await API.get(`/products`);
    const products = productsRes.data;
    setProductList([...products]);
    console.log("products:::::=>");
    console.log(products);
  };

  const fetchPurchases = async () => {
    const purchasesRes = await API.get(`${BASE_PATH}`);
    const purchases = purchasesRes.data;
    const supplierListCopy = [...supplierList];
    console.log("SuppliersCopy:::::=>");
    console.log(supplierListCopy);
    purchases.forEach((purchase) => {
      const supplier = supplierListCopy.find(
        (supplier) => supplier.id === purchase.supplierId
      );
      console.log("supplier Found:::::=>");
      console.log(supplier);
      purchase.supplierName = supplier?.name;
    });
    setPurchaseList([...purchases]);
  };

  const handleDelete = async (id) => {
    const response = await API.delete(`${BASE_PATH}/${id}`);
    console.log(response);
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      notify("Purchase deleted successfully", "success", toast);
    } else {
      notify("Purchase deletion failed", "error", toast);
    }
    const newPurchaseList = purchaseList.filter(
      (purchase) => purchase.id !== id
    );
    setPurchaseList([...newPurchaseList]);
  };

  const handleShowProductList = (currentProductList) => {
    // console.log(currentProductList);
    setCurrentProductList([...currentProductList]);
    handleShow();
  };

  useEffect(() => {
    console.log(currentPoductList);
  }, [currentPoductList]);

  const options = [
    { id: 1, text: "Choose Product", text: "Choose Product" },
    { id: 2, text: "Macbook pro", text: "Macbook pro" },
    { id: 3, text: "Orange", text: "Orange" },
  ];
  const options2 = [
    { id: 1, text: "Choose Category", text: "Choose Category" },
    { id: 2, text: "Computers", text: "Computers" },
    { id: 3, text: "Fruits", text: "Fruits" },
  ];
  const options3 = [
    { id: 1, text: "Choose Sub Category", text: "Choose Sub Category" },
    { id: 2, text: "Computers", text: "Computers" },
  ];
  const options4 = [
    { id: 1, text: "Brand", text: "Brand" },
    { id: 2, text: "N/D", text: "N/D" },
  ];
  const options5 = [
    { id: 1, text: "Price", text: "Price" },
    { id: 2, text: "150.00", text: "150.00" },
  ];

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const columns = [
    {
      title: "Refference Number",
      dataIndex: "refferenceNo",
      sorter: (a, b) => a.refferenceNo.length - b.refferenceNo.length,
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Purchse Date",
      render: (text, record) => record.createDate.split("T")[0],
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      render: (text, record) => (
        <span
          className={
            text === "Paid"
              ? "badges bg-lightgreen"
              : text == "Pending"
              ? "badges bg-lightred"
              : "badges bg-lightyellow"
          }
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Grand Total",
      dataIndex: "amount",
      sorter: (a, b) => a.amount.length - b.amount.length,
      width: "125px",
      render: (text, record) => (
        <span>
          Ksh.{" "}
          {record.amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        </span>
      ),
    },
    {
      title: "Paid",
      dataIndex: "amount",
      sorter: (a, b) => a.paid.length - b.paid.length,
      render: (text, record) => (
        <span>
          Ksh.{" "}
          {record.amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        </span>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Link
            className="me-3"
            to="#"
            onClick={() => handleShowProductList(record.purchaseProducts)}
          >
            <img src={Excel} alt="img" />
          </Link>
          <Link
            className="me-3"
            to={{
              pathname: "/peul-pos/purchase/addpurchase-purchase",
              state: { purchase: record },
            }}
          >
            <img src={EditIcon} alt="img" />
          </Link>
          <Link
            className="confirm-text"
            to="#"
            onClick={() => handleDelete(record.id)}
          >
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
              <h4>Purchase List</h4>
              <h6>Manage your Purchase</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/peul-pos/purchase/addpurchase-purchase"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                Add New Purchase
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} />
              {/* /Filter */}
              <div
                className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
                id="filter_inputs"
                style={{ display: inputfilter ? "block" : "none" }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12">
                      <div className="row">
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options}
                              options={{
                                placeholder: "Choose Product",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options2}
                              options={{
                                placeholder: "Choose Category",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options3}
                              options={{
                                placeholder: "Choose Sub Category",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options4}
                              options={{
                                placeholder: "Choose Sub Category",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12 ">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options5}
                              options={{
                                placeholder: "Brand",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-1 col-sm-6 col-12">
                          <div className="form-group">
                            <a className="btn btn-filters ms-auto">
                              <img src={search_whites} alt="img" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div className="table-responsive">
                {!isBusy && (
                  <Table columns={columns} dataSource={updatedPurchaseList} />
                )}
                <Modal
                  dialogClassName="modal-lg"
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{`Product List`}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <table className="table table-striped table-responsive">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Product Code</th>
                          <th scope="col">Category</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Purchase Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPoductList.map((product, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{product.productName}</td>
                            <td>{product.barCode}</td>
                            <td>{product.productCategory}</td>
                            <td>
                              {product.quantity
                                .toString()
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                            </td>
                            <td>
                              Ksh.{" "}
                              {product.purchasePrice
                                .toFixed(2)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default PurchaseList;
