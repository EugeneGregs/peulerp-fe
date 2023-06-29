import React, { useState, useEffect } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  PlusIcon,
  Printer,
  Search,
  search_whites,
  EditIcon,
  DeleteIcon,
} from "../../EntryFile/imagePath";
import { set } from "react-hook-form";

const PurchaseList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [purchaseList, setPurchaseList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [updatedPurchaseList, setUpdatedPurchaseList] = useState([]);
  const [isBusy, setBusy] = useState(false);
  const baseUrl = "http://localhost:5071";

  useEffect(() => {
    const fetchData = async () => {
      setBusy(true);
      fetchProducts().then(() => {
        fetchPurchases()
      })
    };
    fetchData();
  }, []);

  useEffect(() => {
    let purchaseListCopy = [...purchaseList];
    purchaseListCopy.forEach((purchase) => {
      purchase.stockList.map((stock) => {
        const product = productList.find((product) => product.id === stock.productId);
        stock.productName = product.name;
        setUpdatedPurchaseList([...purchaseListCopy]);
      })
    });
    setBusy(false);    
  }, [purchaseList]);

  const fetchProducts = async () => {
    const productsRes = await axios(`${baseUrl}/products`);
    const products = productsRes.data;
    setProductList([...products]);
    console.log(products);
  };

  const fetchPurchases = async () => {
    const purchasesRes = await axios(`${baseUrl}/purchases`);
    const purchases = purchasesRes.data;
    setPurchaseList([...purchases]);
    console.log(purchases);
  }

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
      title: "Supplier Name",
      dataIndex: "supplierId",
      sorter: (a, b) => a.supplierId.length - b.supplierId.length,
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      sorter: (a, b) => a.paymentType.length - b.paymentType.length,
    },
    {
      title: "Purchse Date",
      render: (text, record) => (record.createDate.split("T")[0])
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span
          className={
            text === 1
              ? "badges bg-lightgreen"
              : text == 2
              ? "badges bg-lightred"
              : "badges bg-lightyellow"
          }
        >
          {text == 1 ? "Paid" : text == 2 ? "Unpaid" : "Partial"}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Grand Total",
      dataIndex: "amount",
      sorter: (a, b) => a.amount.length - b.amount.length,
      width: "125px",
    },
    {
      title: "Paid",
      dataIndex: "amount",
      sorter: (a, b) => a.paid.length - b.paid.length,
    },
    {
      title: "Action",
      render: () => (
        <>
          <Link className="me-3" to="">
            <img src={Excel} alt="img" />
          </Link>
          <Link className="me-3" to="/dream-pos/purchase/editpurchase-purchase">
            <img src={EditIcon} alt="img" />
          </Link>
          <Link className="confirm-text" to="">
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
                to="/dream-pos/purchase/addpurchase-purchase"
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
                className={`card mb-0 ${ inputfilter ? "toggleCls" : ""}`}
                id="filter_inputs"
                style={{ display: inputfilter ? "block" :"none"}}
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
                { !isBusy && <Table columns={columns} dataSource={updatedPurchaseList} /> }
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default PurchaseList;
