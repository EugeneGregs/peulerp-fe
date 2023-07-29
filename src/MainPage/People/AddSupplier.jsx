import React, { useState, useEffect } from "react";
import { Upload } from "../../EntryFile/imagePath";
import "react-select2-wrapper/css/select2.css";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const AddSupplier = () => {
  const { state } = useLocation();
  const [supplier, setSupplier] = useState({});
  const [saveType, setSaveType] = useState("post");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const API = usePrivateAxios();

  useEffect(() => {
    if (state && state.supplier) {
      let supplier = state.supplier;
      setSupplier(supplier);
      setSaveType("update");
      setName(supplier.name);
      setEmail(supplier.email);
      setPhone(supplier.phone);
      setAddress(supplier.address);
      setDescription(supplier.description);

      console.log("Supplier::");
      console.log(supplier);
    }
  }, []);

  const handleSubmit = () => {
    if (isInputsValid()) {
      if (saveType == "post") {
        addSupplier();
      } else {
        updateSupplier();
      }
    }
  };

  const isInputsValid = () => {
    console.log(name, email, phone, address, description);
    if (!name) {
      notify("Please enter supplier name", "error", toast);
      return false;
    }
    if (!email) {
      notify("Please enter email", "error", toast);
      return false;
    }
    if (!phone) {
      notify("Please enter phone", "error", toast);
      return false;
    }
    if (!address) {
      notify("Please enter address", "error", toast);
      return false;
    }
    if (!description) {
      notify("Please enter description", "error", toast);
      return false;
    }
    return true;
  }

  const addSupplier = () => {
    const supplier = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      description: description,
    };
    console.log("New::");
    console.log(supplier);
    API
      .post(`/suppliers`, supplier)
      .then((res) => {
        console.log(res.status);
        if (res.status == 200 || res.status == 201) {
          notify("Supplier added successfully", "success", toast);
          clearInputs();
        }
      })
      .catch((err) => {
        notify("Error adding supplier", "error", toast);
      });
  };

  const updateSupplier = () => {
    console.log("Update");
    let updatedSupplier = {
      ...supplier,
       name: name,
       email: email,
       phone: phone,
       address: address,
       description: description
    }
    API
      .put(`/suppliers/${updatedSupplier.id}`, updatedSupplier)
      .then((res) => {
        console.log(res.status);
        if (res.status == 200 || res.status == 204) {
          notify("Supplier updated successfully", "success", toast);
          clearInputs();
        }
      })
      .catch((err) => {
        notify("Error updating supplier", "error", toast);
      });
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setDescription("");
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Supplier Management</h4>
              <h6>{`${saveType == "post" ? "Add" : "Update"} Supplier`}</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Supplier Name</label>
                    <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required/>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                     type="text"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required/>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                     type="text"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     required/>
                  </div>
                </div>
                <div className="col-lg-9 col-12">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required/>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> Avatar</label>
                    <div className="image-upload">
                      <input type="file" />
                      <div className="image-uploads">
                        <img src={Upload} alt="img" />
                        <h4>Drag and drop a file to upload</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-submit me-2" onClick={handleSubmit}>Submit</button>
                  <button className="btn btn-cancel" onClick={clearInputs}>Clear</button>
                </div>
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

export default AddSupplier;
