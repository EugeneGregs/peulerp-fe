import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable"
import Tabletop from "../../EntryFile/tabletop"
import {
  PlusIcon,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  search_whites,
} from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import Loader from "react-js-loader";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const ProductList = () => {
  const [inputfilter, setInputfilter] = useState(false);

  //select2
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

  let products = []
  const [data, updateData] = useState({ products: [], filtered: [] });
  const [isBusy, setBusy] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const API = usePrivateAxios();
  const BASE_PATH = "/products";

  useEffect(() => {
    setBusy(true);
    const fetchData = async () => {
      API.get(`${BASE_PATH}`)
        .then(res => {
          const resData = res.data;
          let products = resData ? [...resData.map(p => { return {name: p.name, sellingPrice: p.sellingPrice, buyingPrice: p.buyingPrice, barCode: p.barCode, productCategory: { name: p.productCategory.name, id: p.productCategory.id}, id: p.id} })] : [];
          updateData({products : [...products], filtered: [...products]});
          setBusy(false);
        })
    }

    fetchData().catch(console.log(console.error));
  }, []);

  const togglefilter = (value) => {
    setInputfilter(value);
    // updateData(data.splice(0,10));
  };

  useEffect(() => {
    console.log("SearchKey::" + filterValue);
    if(!filterValue){
      console.log(data.products);
      updateData({products: [...data.products], filtered: [...data.products]});
    } else {
      const filteredData = data.products.filter( p => p.name.replaceAll(' ','').toLowerCase().includes(filterValue) || p.productCategory.name.replaceAll(' ','').toLowerCase().includes(filterValue));
      (filteredData && filteredData.length) ? updateData({products: [...data.products], filtered: [...filteredData]}) : updateData({products: [...data.products], filtered: [...data.filtered]});
    }
  }, [filterValue])

  const filterData = (e) => {
    console.log(data);
    let inputValue = e.target.value.trim().toLowerCase();
    setFilterValue(inputValue);
  };

  const deleteProduct = (product) => {
    console.log(product);

    API.delete(`${BASE_PATH}/${product.id}`)
      .then(res => {
        const products = data.products;
        const filtered = data.filtered;
        const filteredIndex = filtered.indexOf(filtered.find(f => f.id == product.id));
        const productIndex = products.indexOf(products.find(f => f.id == product.id));

        productIndex >= 0 && products.splice(productIndex, 1);
        filteredIndex >= 0 && filtered.splice(filteredIndex, 1);

        updateData({ products: [...data.products], filtered: [...data.filtered] } );

        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: `${product.name} Deleted Successfully`,
          confirmButtonClass: "btn btn-success",
        });
    })
  }

  const confirmText = (product) => {
    Swal.fire({
      title: `Delete ${product.name}?`,
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
      t.value && deleteProduct(product);
    });
  };

  const imageAddress = "https://cdn-icons-png.flaticon.com/512/3703/3703259.png";

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="productimgname">
          <Link className="product-img">
            <img alt="" src={imageAddress} />
          </Link>
          <Link style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record.name}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Code",
      dataIndex: "barCode",
      sorter: (a, b) => a.barCode.length - b.barCode.length,
    },
    {
      title: "Category",
      render: (record) => record.productCategory.name,
      sorter: (a, b) => a.productCategory.name.length - b.productCategory.name.length,
    },
    {
      title: "Price",
      dataIndex: "sellingPrice",
      sorter: (a, b) => a.sellingPrice.length - b.sellingPrice.length,
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <>
            <Link className="me-3" to="/peul-pos/product/product-details">
              <img src={EyeIcon} alt="img" />
            </Link>
            <Link className="me-3" to="/peul-pos/product/addproduct-product" state={{ product: record }}>
              <img src={EditIcon} alt="img" />
            </Link>
            <Link className="confirm-text" to="#" onClick={() => confirmText(record)}>
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
              <h4>Product List</h4>
              <h6>Manage your products</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/peul-pos/product/addproduct-product"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                Add New Product
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop
                inputfilter={inputfilter}
                togglefilter={togglefilter}
                filterFunction={filterData}
                filterValue = {filterValue}
              />
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
                {
                  isBusy ? (<div className={"item"}> <Loader type="spinner-default" bgColor={"#FFFFFF"} title={"spinner-default"} color={'#FFFFFF'} size={100} /> </div>)
                    : <Table columns={columns} dataSource={data.filtered} /> }
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default ProductList;
