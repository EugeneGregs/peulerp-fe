import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import {
  ClosesIcon,
  Noimage,
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

const baseUrl = "http://localhost:5071/suppliers";

const SupplierList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [supplierList, setSupplierList] = useState([]);
  const [isBusy, setBusy] = useState(false);

  useEffect(() => {
    setBusy(true);
    const fetchData = async () => {
      axios.get(`${baseUrl}`).then((res) => {
        const resData = res.data;
        console.log(resData);
        setSupplierList([...resData]);
        setBusy(false);
      });
    };

    fetchData().catch((reason) => console.log(reason));
  }, []);

  const confirmText = (supplier) => {
    Swal.fire({
      title: `Delete ${supplier.name}?`,
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value && deleteSupplier(supplier.id)
    });
  };
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const deleteSupplier = (id) => {
    axios.delete(`${baseUrl}/${id}`)
    .then((res) => {
      console.log(res.status);
      setSupplierList([...supplierList.filter((supplier) => supplier.id !== id)]);
      notify("Deleted Successfully", "success", toast);
    })
    .catch((err) => {
      console.log(err);
      notify("Delete Operation Failed", "error", toast);
    });
  }

  const columns = [
    {
      title: "Supplier Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img src={Noimage} alt="product" />
          </Link>
          <Link to="#">{text}</Link>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
      width: "250px",
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
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Link className="me-3" to={ { pathname: "/dream-pos/people/addsupplier-people", state: { supplier: record } } }>
            <img src={EditIcon} alt="img" />
          </Link>
          <Link className="confirm-text" to="#" onClick={() => confirmText(record)}>
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
              <h4>Supplier List</h4>
              <h6>Manage your Supplier</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/dream-pos/people/addsupplier-people"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                Add Supplier
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
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Supplier Code" />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Supplier" />
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
               { !isBusy && <Table columns={columns} dataSource={supplierList} />}
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
export default SupplierList;
