import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import Tabletop from "../../EntryFile/tabletop";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import {
  PlusIcon,
  search_whites,
  EditIcon,
  DeleteIcon,
} from "../../EntryFile/imagePath";
import Swal from "sweetalert2";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import usePrivateAxios from "../../hooks/usePrivateAxios";

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

const ExpenseList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [isBusy, setBusy] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const API = usePrivateAxios();
  const BASE_PATH = "/expense";

  useEffect(() => {
    fetchExpenseList();
  }, []);

  const fetchExpenseList = async () => {
    setBusy(true);
    await API.get(BASE_PATH)
      .then((response) => {
        handleResponse(response, "load", null);
      })
      .catch((error) => {
        handleErrors(error, "load");
      });
  };

  const deleteExpense = async (id) => {
    setBusy(true);
    await API.delete(`${BASE_PATH}/${id}`)
      .then((response) => {
        handleResponse(response, "delete", id);
      })
      .catch((error) => {
        handleErrors(error, "delete");
      });
  };

  const handleResponse = (response, type, expenseId) => {
    setBusy(false);
    console.log(response);
    const message =
      type === "load"
        ? "Expense Loaded Successfully"
        : "Expense Deleted Successfully";

    if (response.status === 200 || response.status === 204) {
      if (type === "load") {
        setExpenseList(response.data);
      }

      if (type === "delete") {
        const expenseListCopy = [...expenseList];
        const deletedIndex = expenseListCopy.findIndex(
          (expense) => expense.id === expenseId
        );

        expenseListCopy.splice(deletedIndex, 1);
        setExpenseList(expenseListCopy);
      }

      notify(message, "success", toast);
    }
  };

  const handleErrors = (error, type) => {
    setBusy(false);
    console.log(error);
    const message =
      type === "load" ? "Error Loading Expense" : "Error Deleting Expense";
    notify(message, "error", toast);
  };

  const confirmText = (expense) => {
    Swal.fire({
      title: `Delete Expense: ${expense.name}?`,
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value && deleteExpense(expense.id);
    });
  };
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const columns = [
    {
      title: "Reference",
      dataIndex: "id",
      render: (text, record) => <span>{text.substring(0, 8)}</span>,
    },
    {
      title: "Category Name",
      dataIndex: "expenseType",
      sorter: (a, b) => a.expenseType.length - b.expenseType.length,
    },
    {
      title: "Description",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount.length - b.amount.length,
      width: "125px",
      render: (text, record) => (
        <span>
          Ksh. {text.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        </span>
      ),
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      sorter: (a, b) => a.paymentType.length - b.paymentType.length,
      render: (text, record) => (
        <span className={"badges bg-lightgreen"}>{text}</span>
      ),
    },
    {
      title: "Expense Date",
      dataIndex: "expenseDate",
      render: (text, record) => <span>{text.split("T")[0]}</span>,
      sorter: (a, b) => a.expenseDate.length - b.expenseDate.length,
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Link
            className="me-3"
            to="/peul-pos/expense/addexpense-expense"
            state={{ expense: record }}
          >
            <img src={EditIcon} alt="img" />
          </Link>
          <Link
            className="confirm-text"
            to="#"
            onClick={() => confirmText(record)}
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
              <h4>Expense List</h4>
              <h6>Manage your Expenses</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/peul-pos/expense/addexpense-expense"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                Add New Expense
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
                                placeholder: "Brand",
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
                                placeholder: "Price",
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
                {expenseList.length && (
                  <Table columns={columns} dataSource={expenseList} />
                )}
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
export default ExpenseList;
