import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AvocatImage,
  Dash1,
  Dash2,
  Dash3,
  Dash4,
  Dropdown,
  OrangeImage,
  PineappleImage,
  EarpodIcon,
  StawberryImage,
  IphoneIcon,
  SamsungIcon,
  MacbookIcon,
} from "../EntryFile/imagePath";
import { Table } from "antd";
import "antd/dist/antd.css";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import CountUp from "react-countup";
import { Helmet } from "react-helmet";
import * as Constants from "../common/Constants";
import { notify } from "../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";

const baseUrl = Constants.BASE_URL;

const Dashboard = (props) => {
  const [diminishingProducts, setDiminishingProducts] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);
  const [monthlyPurchases, setMonthlyPurchases] = useState([]);
  const [isBusy, setBusy] = useState(false);

  const state = {
    series: [
      {
        name: "Sales",
        data: monthlySales,
      },
      {
        name: "Purchase",
        data: monthlyPurchases,
      },
    ],
    options: {
      colors: ["#28C76F", "#EA5455"],
      chart: {
        type: "bar",
        height: 300,
        stacked: true,

        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 280,
          options: {
            legend: {
              position: "bottom",
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
          borderRadius: 5,
          borderRadiusTop: 5,
        },
      },
      xaxis: {
        categories: [
          "Jan ",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
        ],
      },
      legend: {
        position: "top",
      },
      fill: {
        opacity: 1,
      },
    },
  };

  useEffect(() => {
    Promise.all([
      fetchDiminishingProducts(),
      fetchDashboardSummary(),
      fetchSuppliers(),
    ]);
  }, []);

  useEffect(() => {
    if (dashboardSummary && dashboardSummary.salesSummary) {
      console.log("dashboardSummary:::=>");
      console.log(dashboardSummary);
      const { salesSummary, purchaseSummary, expenseSummary } =
        dashboardSummary;

      setTotalSales(salesSummary.totalSales);
      setTotalPurchase(purchaseSummary.totalPurchases);
      setGrossProfit(salesSummary.grossProfit);
      setTotalExpenses(expenseSummary.totalExpenses);
      setTransactionCount(salesSummary.transactionCount);

      const localMonthlySalesAggregation = populateMonthlyAggregate(
        salesSummary.monthlyAggregation,
        "sales"
      );
      const localMonthlyPurchasesAggregation = populateMonthlyAggregate(
        purchaseSummary.monthlyPurchaseTotals,
        "purchase"
      );

      setMonthlySales(localMonthlySalesAggregation);
      setMonthlyPurchases(localMonthlyPurchasesAggregation);
    }
  }, [dashboardSummary]);

  const populateMonthlyAggregate = (summary, type) => {
    let summaryToPopulate = [];
    if (!summary) {
      for (let i = 1; i <= 12; i++) {
        summaryToPopulate.push(0);
      }
      return summaryToPopulate;
    }
    const monthNumbers = Object.keys(summary).sort();

    for (let i = 1; i < +monthNumbers[0]; i++) {
      summaryToPopulate.push(0);
    }

    monthNumbers.forEach((m) => {
      const sum = type === "sales" ? summary[m] : -summary[m];
      summaryToPopulate.push(sum);
    });

    return summaryToPopulate;
  };

  const fetchDiminishingProducts = async () => {
    axios
      .get(`${baseUrl}/diminishing`)
      .then((res) => {
        const resData = res.data;
        console.log(resData);
        setDiminishingProducts([...resData]);
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

  const fetchDashboardSummary = async () => {
    axios
      .get(`${baseUrl}/dashboard`)
      .then((res) => {
        const resData = res.data;
        console.log(resData);
        setDashboardSummary({ ...resData });
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

  const fetchSuppliers = async () => {
    axios
      .get(`${baseUrl}/suppliers`)
      .then((res) => {
        const resData = res.data;
        console.log(resData);
        setSuppliers([...resData]);
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

  const handleErrors = (error) => {
    notify("Error Loading Dashboard", "error", toast);
  };

  const suppliersColumns = [
    {
      title: "Supplier Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
    },
  ];

  const diminishingProductsColumns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.key.length - b.key.length,
    },
    {
      title: "Category",
      dataIndex: "productCategory",
      render: (text, record) => <span>{record.productCategory.name}</span>,
      sorter: (a, b) => a.key.length - b.key.length,
    },
    {
      title: "Code",
      dataIndex: "barCode",
      sorter: (a, b) => a.price.length - b.price.length,
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>Admin Dashboard</title>
          <meta name="description" content="Dashboard page" />
        </Helmet>
        <div className="content">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget">
                <div className="dash-widgetimg">
                  <span>
                    <img src={Dash1} alt="img" />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    Ksh.
                    <span className="counters">
                      <CountUp end={totalSales} />
                    </span>
                  </h5>
                  <h6>Total Sales</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget dash1">
                <div className="dash-widgetimg">
                  <span>
                    <img src={Dash2} alt="img" />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    Ksh.
                    <span className="counters">
                      <CountUp end={totalPurchase} />
                    </span>
                  </h5>
                  <h6>Total Purchases</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget dash2">
                <div className="dash-widgetimg">
                  <span>
                    <img src={Dash3} alt="img" />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    Ksh.
                    <span className="counters">
                      <CountUp end={totalExpenses} />
                    </span>
                  </h5>
                  <h6>Total Expenses</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget dash3">
                <div className="dash-widgetimg">
                  <span>
                    <img src={Dash4} alt="img" />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    Ksh.
                    <span className="counters">
                      <CountUp end={grossProfit} />
                    </span>
                  </h5>
                  <h6>Gross Profit</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 d-flex">
              <div className="dash-count">
                <div className="dash-counts">
                  <h4>{transactionCount}</h4>
                  <h5>Transactions</h5>
                </div>
                <div className="dash-imgs">
                  <FeatherIcon icon="user" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das1">
                <div className="dash-counts">
                  <h4>{suppliers.length}</h4>
                  <h5>Suppliers</h5>
                </div>
                <div className="dash-imgs">
                  <FeatherIcon icon="user-check" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das2">
                <div className="dash-counts">
                  <h4>5000</h4>
                  <h5>Cash In Shop</h5>
                </div>
                <div className="dash-imgs">
                  <FeatherIcon icon="file-text" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das3">
                <div className="dash-counts">
                  <h4>10000</h4>
                  <h5>cash In Mpesa</h5>
                </div>
                <div className="dash-imgs">
                  <FeatherIcon icon="file" />
                </div>
              </div>
            </div>
          </div>
          {/* Button trigger modal */}
          <div className="row">
            <div className="col-lg-7 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Purchase &amp; Sales</h5>
                  <div className="graph-sets">
                    <div className="dropdown">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        2023
                        <img src={Dropdown} alt="img" className="ms-2" />
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li>
                          <Link to="#" className="dropdown-item">
                            2023
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            2022
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            2021
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Chart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Diminishing Products</h4>
                  <div className="dropdown dropdown-action profile-action">
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      className="dropset"
                    >
                      <i className="fa fa-ellipsis-v" />
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <Link
                          to="/dream-pos/product/productlist-product"
                          className="dropdown-item"
                        >
                          Product List
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dream-pos/product/addproduct-product"
                          className="dropdown-item"
                        >
                          Product Add
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive dataview">
                    {diminishingProducts.length === 0 ? (
                      ""
                    ) : (
                      <Table
                        className="table datatable"
                        key={props}
                        columns={diminishingProductsColumns}
                        dataSource={diminishingProducts}
                        pagination={false}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-0">
            <div className="card-body">
              <h4 className="card-title">Suppliers</h4>
              <div className="table-responsive dataview">
                {suppliers.length === 0 ? (
                  ""
                ) : (
                  <Table
                    className="table datatable"
                    key={props}
                    columns={suppliersColumns}
                    dataSource={suppliers}
                    rowKey={(record) => record.id}
                    pagination={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Dashboard;
