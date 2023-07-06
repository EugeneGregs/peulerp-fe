import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  Calendar,
  Printer,
  search_whites,
  Search,
  MacbookIcon,
  OrangeImage,
  PineappleImage,
  StawberryImage,
  AvocatImage,
  Product1,
  Product7,
  Product8,
  Product9,
} from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { set } from "react-hook-form";

const baseUrl = "http://localhost:5071";

const Invertry = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const options = [
    { id: 1, text: "Choose Supplier", text: "Choose Product" },
    { id: 2, text: "Supplier", text: "Supplier" },
  ];
  const [inputfilter, setInputfilter] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [isBusy, setBusy] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setBusy(true);
      console.log("fetching data");
      axios.get(`${baseUrl}/stock`).then((res) => handleResponse(res));
    };

    fetchData().catch((reason) => console.log(reason));
  }, []);

  const handleResponse = (response) => {
    console.log("Fetched Data");
    setBusy(false);
    if (response.status === 200) {
        const resData = response.data;
        console.log(resData);
        setInventoryList([...resData]);
    } else {
      notify("Error Fetching Data", "Error", toast);
    }
  }

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#">{text}</Link>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Product Code",
      dataIndex: "barCode",
      sorter: (a, b) => a.barCode.length - b.barCode.length,
    },
    {
      title: "Category",
      dataIndex: "Category",
      render: (text, record) => (
        <span>{record.productCategory.name}</span>
      ),
      sorter: (a, b) => a.Category.length - b.Category.length,
    },
    {
      title: "Buying Price",
      dataIndex: "buyingPrice",
      sorter: (a, b) => a.buyingPrice.length - b.buyingPrice.length,
    },
    {
      title: "Selling Price",
      dataIndex: "sellingPrice",
      sorter: (a, b) => a.sellingPrice.length - b.sellingPrice.length,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity.length - b.quantity.length,
    },
    {
      title: "Updated At",
      dataIndex: "updatedDate",
      render: (text, record) => (
        <span>{new Date(record.updatedDate).toLocaleDateString()}</span>
      ),
      sorter: (a, b) => a.updatedDate.length - b.updatedDate.length,
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Inventory Report</h4>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-path">
                  <a
                    className={` btn ${
                      inputfilter ? "btn-filter setclose" : "btn-filter"
                    } `}
                    id="filter_search"
                    onClick={() => togglefilter(!inputfilter)}
                  >
                    <img src={Filter} alt="img" />
                    <span>
                      <img src={ClosesIcon} alt="img" />
                    </span>
                  </a>
                </div>
                <div className="search-input">
                  <input
                    className="form-control form-control-sm search-icon"
                    type="text"
                    placeholder="Search..."
                  />
                  <a className="btn btn-searchset">
                    <img src={Search} alt="img" />
                  </a>
                </div>
              </div>
              <div className="wordset">
                <ul>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="pdf"
                    >
                      <img src={Pdf} alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="excel"
                    >
                      <img src={Excel} alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="print"
                    >
                      <img src={Printer} alt="img" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* /Filter */}
            <div
              className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
              id="filter_inputs"
              style={{ display: inputfilter ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
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
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate1}
                          onChange={(date) => setStartDate1(date)}
                        />
                        <div className="addonset">
                          <img src={Calendar} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <Select2
                        className="select"
                        data={options}
                        options={{
                          placeholder: "Choose Suppliers",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-1 col-sm-6 col-12 ms-auto">
                    <div className="form-group">
                      <a className="btn btn-filters ms-auto">
                        <img src={search_whites} alt="img" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Filter */}
            <div className="table-responsive">
              { !isBusy && <Table columns={columns} dataSource={inventoryList} />}
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Invertry;
