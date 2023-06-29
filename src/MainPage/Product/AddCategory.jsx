import React, { useEffect } from "react";
import { Upload } from "../../EntryFile/imagePath";
import axios from "axios";
import { notify } from "../../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = React.useState("");
  const baseUrl = "http://localhost:5071";
  const { state } = useLocation();
  const [saveType, setSaveType] = React.useState("post");

  const addCategory = () => {
    console.log(category);
    if (!category) {
      notify("Please enter category name", "error", toast);
      return;
    }
    axios
      .post(`${baseUrl}/productcategory`, {
        Name: category,
      })
      .then(handleResponse(res))
      .catch(handleError(err));
  };

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
    notify(
      `Category ${saveType == "post" ? "added" : "updated"} successfully`,
      "success",
      toast
    );
  };

  const handleError = (err) => {
    console.log(err.message);
    notify(
      `Error ${saveType == "post" ? "adding" : "updating"} category`,
      "error",
      toast
    );
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Add Category</h4>
              <h6>Create new product Category</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
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
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> Product Image</label>
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
                  <button className="btn btn-cancel">Cancel</button>
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

export default AddCategory;
