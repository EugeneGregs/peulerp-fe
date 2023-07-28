import React, { useState, useEffect } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import Tabletop from "../../EntryFile/tabletop";
import Loader from "react-js-loader";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import {
  PlusIcon,
  EditIcon,
  DeleteIcon,
  search_whites,
} from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import Swal from "sweetalert2";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const options = [
  { id: 1, text: "Choose Category", text: "Choose Category" },
  { id: 2, text: "Computers", text: "Computers" },
];
const options1 = [
  { id: 1, text: "Choose Sub Category", text: "Choose Sub Category" },
  { id: 2, text: "Fruits", text: "Fruits" },
];
const options2 = [
  { id: 1, text: "Choose Sub Brand", text: "Choose Sub Brand" },
  { id: 2, text: "Brand", text: "Brand" },
];
const confirmText = (category, deleteCategory) => {
  Swal.fire({
    title: `Delete ${category.name}?`,
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
    t.value && deleteCategory(category.id);
  });
};
const CategoryList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const API = usePrivateAxios();
  const BASE_PATH = "/productcategory";

  useEffect(() => {
    setBusy(true);
    const fetchData = async () => {
      API.get(`${BASE_PATH}`).then((res) => {
        const resData = res.data;
        let catList = resData.map(c => {return { id: c.id, code: c.id.split("-")[0], name: c.name, createdBy: "Admin", createdAt: c.createdDate.split("T")[0]}})
        console.log(catList)
        setCategories([...catList]);
        setBusy(false);
      });
    };
  
    fetchData().catch(reason => console.log(reason));
  }, []);

  const deleteCategory = (id) => {
    console.log(id)
    API.delete(`${BASE_PATH}/${id}`).then((res) => {
      const resData = res.data;
      console.log(resData)
      setCategories([...categories.filter(c => c.code !== id.split("-")[0])]);
      notify("Category deleted successfully", "success", toast);
    });
  }

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Category Code",
      dataIndex: "code",
      sorter: (a, b) => a.code.length - b.code.length,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <>
            <Link className="me-3" to={{ pathname: "/peul-pos/product/addcategory-product", state: { category: record } }}>
              <img src={EditIcon} alt="img" />
            </Link>
            <Link className="confirm-text" to="#" onClick={() => { confirmText(record, deleteCategory)} }>
              <img src={DeleteIcon} alt="img" />
            </Link>
          </>
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
              <h4>Product Category List </h4>
              <h6>View/Search product Category</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/peul-pos/product/addcategory-product"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                Add Category
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
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options}
                          options={{
                            placeholder: "Choose Category",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12 me-2">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options1}
                          options={{
                            placeholder: "Choose Sub Category",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options2}
                          options={{
                            placeholder: "Choose Sub Brand",
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
               { isBusy ? (<div className={"item"}> <Loader type="spinner-default" bgColor={"#FFFFFF"} title={"spinner-default"} color={'#FFFFFF'} size={100} /> </div>) : <Table columns={columns} dataSource={categories} /> }
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
export default CategoryList;
