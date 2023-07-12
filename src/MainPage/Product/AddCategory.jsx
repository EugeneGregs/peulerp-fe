import React, { useEffect } from "react";
import { Upload, Excel, PlusIcon } from "../../EntryFile/imagePath";
import axios from "axios";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import * as xlsx from "xlsx";
import Table from "../../EntryFile/datatable";
import { set } from "react-hook-form";
import * as Constants from "../../common/Constants";

const AddCategory = () => {
  const [category, setCategory] = React.useState("");
  const baseUrl = Constants.BASE_URL;
  const { state } = useLocation();
  const [saveType, setSaveType] = React.useState("post");
  const [isBulkUpload, setIsBulkUpload] = React.useState(false);
  const [categoryList, setCategoryList] = React.useState([]);

  const addCategory = () => {
    console.log(category);

    if(isBulkUpload){
      uploadBulcCategory();
      return;
    }

    if (!category) {
      notify("Please enter category name", "error", toast);
      return;
    }
    axios
      .post(`${baseUrl}/productcategory`, {
        Name: category,
      })
      .then((res) => handleResponse(res))
      .catch((err) => handleError(err));
  };

  const uploadBulcCategory = () => {
    let categoriesToPost = [];
    categoryList.forEach((category) => {
      categoriesToPost.push({Name: category.name});
    });

    if(categoryList.length == 0){
      notify("Please upload category list", "error", toast);
      return;
    }

    axios
      .post(`${baseUrl}/productcategory/collection`, categoriesToPost)
      .then((res) => handleResponse(res))
      .catch((err) => handleError(err));
  }

  const updateCategory = () => {
    console.log(category);
    if (!category) {
      notify("Please enter category name", "error", toast);
      return;
    }
    axios
      .put(`${baseUrl}/productcategory/${state.category.id}`, {
        Name: category,
      })
      .then((res) => handleResponse(res))
      .catch((err) => handleError(err));
  };

  useEffect(() => {
    if (state && state.category) {
      setSaveType("update");
      const { category } = state;
      console.log(category);
      setCategory(category.name);
    }
  }, []);

  const handleSubmit = () => {
    if (saveType == "post") {
      addCategory();
    } else {
      updateCategory();
    }
  };

  const handleResponse = (res) => {
    console.log(res);
    clearInputs();
    notify(
      `Category ${saveType == "post" ? "added" : "updated"} successfully`,
      "success",
      toast
    );
  };

  const clearInputs = () => {
    setCategory("");
    setCategoryList([]);
  }

  const handleError = (err) => {
    console.log(err.message);
    notify(
      `Error ${saveType == "post" ? "adding" : "updating"} category`,
      "error",
      toast
    );
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);
        populateCategoryList(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const populateCategoryList = (categoriesFromFile) => {
    const localcategorylist = [];
    for(let categoryFromFile of categoriesFromFile){
      const category = {
        name: categoryFromFile.name,
        code: categoryFromFile.code,
        createdAt: new Date().toLocaleDateString(),
        createdBy: "Admin"
      }
      localcategorylist.push(category);
    }
    setCategoryList(localcategorylist);
  }

  const toggleBulckUpload = () => setIsBulkUpload(!isBulkUpload);

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
    }
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>{`${saveType == "post" ? "Add" : "Update"} Category`}</h4>
              <h6>
                {isBulkUpload
                  ? "Upload new categories from file"
                  : "Create new product category"}
              </h6>
            </div>
            <div
              className="page-btn"
              style={{ display: saveType == "post" ? "block" : "none" }}
            >
              <Link
                to="#"
                className="btn btn-added"
                onClick={toggleBulckUpload}
              >
                <img
                  src={isBulkUpload ? PlusIcon : Excel}
                  alt="img"
                  className="me-1"
                />
                {isBulkUpload ? "Add category" : "Upload Categories"}
              </Link>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div style={{ display: isBulkUpload ? "none" : "block" }}>
                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Category Name</label>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Category Code</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea className="form-control" defaultValue={""} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row"
                style={{ display: isBulkUpload && !categoryList.length ? "block" : "none" }}
              >
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Categories File</label>
                    <div className="image-upload">
                      <input type="file" onChange={readUploadFile}/>
                      <div className="image-uploads">
                        <img src={Upload} alt="img" />
                        <h4>Drag and drop a file to upload</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="table-responsive">
               { (isBulkUpload && categoryList.length) ? <Table columns={columns} dataSource={categoryList} /> : ""}
              </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="col-lg-12">
                <button className="btn btn-submit me-2" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="btn btn-cancel" onClick={clearInputs}>Cancel</button>
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

export default AddCategory;
