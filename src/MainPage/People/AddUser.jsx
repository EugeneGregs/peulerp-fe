import React, { useEffect, useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import "react-select2-wrapper/css/select2.css";
import Select from "react-select";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { USER_ROLES as userRoles, USER_STATUSES as userStatuses } from "../../common/Constants";
import { useLocation, useNavigate } from "react-router-dom";

const AddUser = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [saveType, setSaveType] = useState("post");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userStatus, setUserStatus] = useState(1);
  const [userRole, setUserRole] = useState(2);
  const [isBusy, setIsBusy] = useState(false);
  const API = usePrivateAxios();

  useEffect(() => {
    if (state && state.user) {
      let user = state.user;
      setFirstName(user.name.split(" ")[0]);
      setLastName(user.name.split(" ")[1]);
      setPhone(user.phoneNumber);
      setEmail(user.email);
      setUserStatus(userStatuses.find((s) => s.label === user.status).value);
      setUserRole(userRoles.find((r) => r.label === user.role).value);
      setSaveType("update");
    }
  }, []);

  const handleSubmit = () => {
    setIsBusy(true);

    if (!validateForm()) {
      setIsBusy(false);
      return;
    }

    let user = {
      name: firstName + " " + lastName,
      email,
      phoneNumber: phone,
      role: userRole,
      status: userStatus,
    };

    console.log(user);

    if (saveType === "post") {
      API.post("/users", user)
      .then((res) => handleResponse(res))
      .catch((err) => handleErrorResponse(err));
    } else {
      API.put("/users/" + state.user.id, user)
      .then((res) => handleResponse(res))
      .catch((err) => handleErrorResponse(err));
    }
    
  };

  const clearForm = () => {
    if(saveType === "update") {
      return navigate(-1);
    }

    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setUserStatus(1);
    setUserRole(2);
  };

  const validateForm = () => {
    if (!firstName) {
      notify("Please enter first name", "warning", toast);
      return false;
    }
    if (!lastName) {
      alert("Please enter last name", "warning", toast);
      return false;
    }
    if (!phone) {
      alert("Please enter phone", "warning", toast);
      return false;
    }
    if (!email) {
      alert("Please enter email", "warning", toast);
      return false;
    }
    if (!userStatus) {
      alert("Please select user status", "warning", toast);
      return false;
    }
    if (!userRole) {
      alert("Please select user role", "warning", toast);
      return false;
    }
    return true;
  };

  const handleResponse = (res) => {
    setIsBusy(false);
    if (res.status === 201) {
      notify("Saved successfully", "success", toast);
      clearForm();
    } else {
      notify("Operation failed", "error", toast);
    }
  };

  const handleErrorResponse = (err) => {
    setIsBusy(false);
    if(err.response.status === 400){
      console.log(err.response.data);
      notify(err.response.data, "error", toast);
    }
    notify("Operation failed", "error", toast);
  };

  return (
    <>
      <Segment>
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>User Management</h4>
                <h6>{saveType == "post" ? "Add" : "Update"} User</h6>
              </div>
            </div>
            {/* /add */}
            <div className="card">
              <div className="card-body">
                <Dimmer active={isBusy} inverted>
                  <Loader size="medium">Loading...</Loader>
                </Dimmer>
                <div className="row">
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Status</label>
                      <Select
                        options={userStatuses}
                        onChange={(s) => setUserStatus(s.value)}
                        value={userStatuses.find(
                          (obj) => obj.value === userStatus
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Role</label>
                      <Select
                        options={userRoles}
                        onChange={(r) => setUserRole(r.value)}
                        value={userRoles.find((obj) => obj.value === userRole)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> User Image</label>
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
                    <button
                      className="btn btn-submit me-2"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    <button className="btn btn-cancel" onClick={clearForm}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /add */}
            <ToastContainer />
          </div>
        </div>
      </Segment>
    </>
  );
};

export default AddUser;
