import React, { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Scanner,
  DeleteIcon,
  EditIcon,
  MacbookIcon,
  EarpodIcon,
  Dollar,
} from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import * as Constants from "../../common/Constants";
import { useLocation } from "react-router-dom";
import axios from "axios";

const url = Constants.BASE_URL + "/expense";
const expenseTypes = Constants.EXPENSE_TYPES;
const successCodes = Constants.SUCCESS_CODES;
const paymentTypes = Constants.PAYMENT_TYPES;

const expenseCategoryOptions = expenseTypes.map((expenseType, index) => {
  return { id: index + 1, text: expenseType, text: expenseType };
});

const paymentTypeOptions = paymentTypes.map((paymentType, index) => {
  return { id: index + 1, text: paymentType, text: paymentType };
});

const AddExpense = () => {
  const { state } = useLocation();
  const [saveType, setSaveType] = useState("post");
  const [expense, setExpense] = useState({});
  const [expenseType, setExpenseType] = useState(1);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [paymentType, setPaymentType] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    if (state && state.expense) {
      let { expense } = state;
      const expenseTypeValue = expenseTypes.findIndex(t => t.toLocaleLowerCase() === expense.expenseType.toLocaleLowerCase()) + 1;
      const paymentTypeValue = paymentTypes.findIndex(p => p.toLocaleLowerCase() === expense.paymentType.toLocaleLowerCase()) + 1;

      setSaveType("update");
      setExpense(expense);
      setExpenseType(expenseTypeValue);
      setAmount(expense.amount);
      setDescription(expense.description);
      setExpenseDate(new Date(expense.expenseDate));
      setPaymentType(paymentTypeValue);
      setName(expense.name);
    }
  }, []);

  const handleSubmit = () => {
    if (isInputsValid()) {
      if (saveType == "post") {
        postNewExpense();
      } else {
        updateExpense();
      }
    }
  };

  const postNewExpense = () => {
    let expense = {
      expenseType: expenseType,
      amount: +amount,
      description: description,
      expenseDate: expenseDate,
      paymentType: paymentType,
      name: name,
    };

    console.log(expense);

    axios.post(url, expense).then((response) => handleResponse(response)).catch((error) => hadleError(error) );
  }

  const updateExpense = () => {
    if(!state || !state.expense) {
      notify("Failed to update expense", "error", toast);
      return;
    }

    const { expense } = state;

    let newExpense = {
      id: expense.id,
      expenseType: expenseType,
      amount: amount,
      description: description,
      expenseDate: expenseDate,
      paymentType: paymentType,
      name: name,
    };

    axios.put(url + `/${expense.id}`, newExpense).then((response) => handleResponse(response)).catch((error) => handleError(error));
  }

  const handleResponse = (response) => {
    console.log(response);
    const type = saveType == "post" ? "Added" : "Updated";

    if (successCodes.includes(response.status)) {
      notify(`Expense ${type} successfully`, "success", toast);
      clearInputs();
    } else {
      notify(`Request Failed`, "error", toast);
    }
  }

  const hadleError = (error) => {
    console.log(error);
    const type = saveType == "post" ? "Add" : "Update";
    notify(`Failed to ${type} expense`, "error", toast);
  }

  const clearInputs = () => {
    setExpenseType(1);
    setAmount("");
    setDescription("");
    setExpenseDate(new Date());
    setPaymentType(1);
    setName("");
  }

  const isInputsValid = () => {
    if (!expenseType) {
      notify("Please select expense type", "error", toast);
      return false;
    }
    if (!amount || typeof amount !== "number") {
      notify("Please correct amount", "error", toast);
      return false;
    }
    if (!expenseDate) {
      notify("Please select expense date", "error", toast);
      return false;
    }
    if (!paymentType) {
      notify("Please select payment type", "error", toast);
      return false;
    }
    if (!name) {
      notify("Please enter name", "error", toast);
      return false;
    }
    if(!description){
      notify("Please enter description", "error", toast);
      return false;
    }

    return true;
  }
 
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>{ saveType === "post" ? "Add" : "Update"} Expense</h4>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Expense Category</label>
                    <div className="row">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={expenseCategoryOptions}
                          options={{
                            placeholder: "Choose Category",
                          }}
                          onChange = {(e) => setExpenseType(e.target.value)}
                          value = {expenseType}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Expense Date </label>
                    <div className="input-groupicon">
                      <DatePicker
                        selected={expenseDate}
                        onChange={(date) => setExpenseDate(date)}
                      />
                      <div className="addonset">
                        <img src={Calendar} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Amount</label>
                    <div className="input-groupicon">
                      <input type="text" value={amount} onChange={(e) => setAmount(+e.target.value)}/>
                      <div className="addonset">
                        <img src={Dollar} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                    <label>Payment Type</label>
                    <div className="row">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={paymentTypeOptions}
                          options={{
                            placeholder: "Choose Category",
                          }}
                          onChange = {(e) => setPaymentType(e.target.value)}
                          value = {paymentType}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Expense Name</label>
                    <div className="input-groupicon">
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-submit me-2" onClick={handleSubmit}>Submit</button>
                  <button className="btn btn-cancel" onClick={clearInputs}>Cancel</button>
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

export default AddExpense;
