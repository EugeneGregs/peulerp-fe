import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../EntryFile/datatable";
import {
  PlusIcon,
  MacbookIcon,
  IphoneIcon,
  SamsungIcon,
  EarpodIcon,
  OrangeImage,
  PineappleImage,
  StawberryImage,
  AvocatImage,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  search_whites,
} from "../../EntryFile/imagePath";

const ProductList = ({ products, updateCart }) => {
  const [data, updateData] = useState({});
  const [filterValue, setFilterValue] = useState("");
  const imageAddress =
    "https://cdn-icons-png.flaticon.com/512/3703/3703259.png";
  const columns = [
    {
      title: "Product Name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => (
        <span>{`${record.name}(${record.barCode})`}</span>
      ),
    },
    {
      title: "Code",
      dataIndex: "barCode",
      sorter: (a, b) => a.barCode.length - b.barCode.length,
    },
    {
      title: "Category",
      render: (record) => record.category.name,
      sorter: (a, b) => a.category.name.length - b.category.name.length,
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
            <Link
              className="me-3"
              to="#"
              onClick={() => updateCart(record, "push")}
            >
              <img src={PlusIcon} alt="img" />
            </Link>
          </>
        </>
      ),
    },
  ];

  useEffect(() => {
    console.log("::Products::");
    console.log(products);
    updateData({ products: [...products], filtered: [...products] });
    console.log("Data");
    console.log(data);
  }, []);

  useEffect(() => {
    console.log("SearchKey::" + filterValue);
    if (data.products) {
      if (!filterValue) {
        console.log(data);
        console.log(data.products);
        updateData({
          products: [...data.products],
          filtered: [...data.products],
        });
      } else {
        console.log(data);
        const filteredData =
          data.products.filter(
            (p) =>
              p.name.replaceAll(" ", "").toLowerCase().includes(filterValue) ||
              p.category.name
                .replaceAll(" ", "")
                .toLowerCase()
                .includes(filterValue) ||
                p.barCode.replaceAll(" ", "").toLowerCase().includes(filterValue)
          ) 
        filteredData && filteredData.length
          ? updateData({
              products: [...data.products],
              filtered: [...filteredData],
            })
          : updateData({
              products: [...data.products],
              filtered: [...data.filtered],
            });
      }
    }
  }, [filterValue]);

  const filterData = (e) => {
    console.log("Filtering Data..");
    let inputValue = e.target.value.trim().toLowerCase();
    setFilterValue(inputValue);
  };

  return (
    <div>
      <div className="table-top">
        <div className="search-set">
          <div className="search-input">
            <input
              className="form-control form-control-sm search-icon"
              type="text"
              placeholder="Search..."
              value={filterValue}
              onChange={filterData}
            />
            <Link to="#" className="btn btn-searchset">
              <img src={search_whites} alt="img" />
            </Link>
          </div>
        </div>
      </div>
      {data.filtered && <Table columns={columns} dataSource={data.filtered} />}
    </div>
  );
};

export default ProductList;
