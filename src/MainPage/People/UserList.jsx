import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import Swal from "sweetalert2";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import {
  PlusIcon,
  EditIcon,
  DeleteIcon,
  Thomas,
  Benjamin,
  James,
  Bruklin,
  Beverly,
  search_whites,
} from "../../EntryFile/imagePath";

const UserList = () => {
  const API = usePrivateAxios();
  const BASE_PATH = "/users";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [inputfilter, setInputfilter] = useState(false);
  const [isBusy, setBusy] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setBusy(true);
    API.get(BASE_PATH)
      .then((res) => handleResponse(res))
      .catch((err) => handleError(err));
  }, []);

  const handleResponse = (res) => {
    const { data } = res;
    console.log(data);
    setUserList([...data]);
    setBusy(false);
    notify("User List Loaded Successfully", "success", toast);
  };

  const handleError = (err) => {
    console.log(err);
    setBusy(false);

    if (err.response.status === 401) {
      return handleExpiredSession();
    }

    if (err.response.status === 403) {
      notify("You are not authorized to access this page", "error", toast);
      navigate(-1);
      return;
    }

    notify("Error Loading User List", "error", toast);
  };

  const handleDelete = (id) => {
    setBusy(true);
    API.delete(`${BASE_PATH}/${id}`)
      .then((res) => handleDeleteResponse(res, id))
      .catch((err) => handleDeleteError(err));
  };

  const handleDeleteResponse = (res, id) => {
    setBusy(false);
    const newList = userList.filter((item) => item.id !== id);
    setUserList([...newList]);
    notify("User Deleted Successfully", "success", toast);
  };

  const handleDeleteError = (err) => {
    setBusy(false);
    console.log(err);
    if (err.response.status === 401) {
      return handleExpiredSession();
    }

    if (err.response.status === 403) {
      notify("Unauthorized action", "warning", toast);
      return;
    }

    notify("Error Deleting User", "error", toast);
  };

  const handleExpiredSession = () => {
    notify("Session Expired, Please Login Again", "error", toast);
    navigate(pathname);
  };

  const confirmText = (user) => {
    Swal.fire({
      title: `Delete ${user.name}?`,
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
      t.value && handleDelete(user.id);
    });
  };
  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const options = [
    { id: 1, text: "Disable", text: "Disable" },
    { id: 2, text: "Enable", text: "Enable" },
  ];

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Creted At",
      dataIndex: "createDate",
      sorter: (a, b) => a.createDate.length - b.createDate.length,
    },
    {
      title: "Updated At",
      dataIndex: "updateDate",
      sorter: (a, b) => a.updateDate.length - b.updateDate.length,
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Link className="me-3" to="/peul-pos/people/adduser-people" state ={ {user: record} }>
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
      <Segment>
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>User List</h4>
                <h6>Manage your User</h6>
              </div>
              <div className="page-btn">
                <Link
                  to="/peul-pos/people/adduser-people"
                  className="btn btn-added"
                >
                  <img src={PlusIcon} alt="img" className="me-1" />
                  Add User
                </Link>
              </div>
            </div>
            {/* /product list */}
            <div className="card">
              <div className="card-body">
                <Dimmer active={isBusy} inverted>
                  <Loader size="medium">Loading...</Loader>
                </Dimmer>
                <Tabletop
                  inputfilter={inputfilter}
                  togglefilter={togglefilter}
                />
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
                          <input type="text" placeholder="Enter User Name" />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="form-group">
                          <input type="text" placeholder="Enter Phone" />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="form-group">
                          <input type="text" placeholder="Enter Email" />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="form-group">
                          <Select2
                            className="select"
                            data={options}
                            options={{
                              placeholder: "Disable",
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
                  {!isBusy && <Table columns={columns} dataSource={userList} />}
                </div>
              </div>
            </div>
            {/* /product list */}
            <ToastContainer />
          </div>
        </div>
      </Segment>
    </>
  );
};

export default UserList;
