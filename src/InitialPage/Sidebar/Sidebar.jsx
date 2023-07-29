import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import withRouter from "../../hooks/withRouter";
import {
  Dashboard,
  Expense,
  People,
  Places,
  Product,
  Time,
  Users1,
  settings,
  Purchase,
  Quotation,
  Return,
  Transfer,
  Sales1,
} from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [path, setPath] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const pageRefresh = (url, page) => {
    navigate(`/peul-pos/${url}/${page}`);
    window.location.reload();
  };
  const location = useLocation();
  let pathname = location.pathname;
  useEffect(() => {
    document.querySelector(".main-wrapper").classList.remove("slide-nav");
    document.querySelector(".sidebar-overlay").classList.remove("opened");
    document.querySelector(".sidebar-overlay").onclick = function () {
      this.classList.remove("opened");
      document.querySelector(".main-wrapper").classList.remove("slide-nav");
    };
  }, [pathname]);

  return (
    <div className="sidebar" id="sidebar">      
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div
              id="sidebar-menu"
              className="sidebar-menu"
              onMouseLeave={expandMenu}
              onMouseOver={expandMenuOpen}
            >
              <ul>
                <li className={pathname.includes("dashboard") ? "active" : ""}>
                  <Link
                    to="/peul-pos/dashboard"
                    onClick={() => toggleSidebar(isSideMenu == "" ? "" : "")}
                  >
                    <img src={Dashboard} alt="img" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/peul-pos/product")
                        ? "active subdrop"
                        : "" || isSideMenu == "product"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "product" ? "" : "product")
                    }
                  >
                    <img src={Product} alt="img" />
                    <span> Product </span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "product" ? (
                    <ul className="sidebar-ul">
                      <li>
                        <Link
                          className={
                            pathname.includes("productlist-") ? "active" : ""
                          }
                          to="/peul-pos/product/productlist-product"
                        >
                          Product List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addproduct-") ? "active" : ""
                          }
                          to="/peul-pos/product/addproduct-product"
                        >
                          Add Product
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("categorylist-") ? "active" : ""
                          }
                          to="/peul-pos/product/categorylist-product"
                        >
                          Category List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addcategory-") ? "active" : ""
                          }
                          to="/peul-pos/product/addcategory-product"
                        >
                          Add Category{" "}
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          className={
                            pathname.includes("subcategorytable-")
                              ? "active"
                              : ""
                          }
                          to="/peul-pos/product/subcategorytable-product"
                        >
                          Sub Category List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addsubcategory-") ? "active" : ""
                          }
                          to="/peul-pos/product/addsubcategory-product"
                        >
                          Add Sub Category{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("brandlist-") ? "active" : ""
                          }
                          to="/peul-pos/product/brandlist-product"
                        >
                          Brand list{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addbrand-") ? "active" : ""
                          }
                          to="/peul-pos/product/addbrand-product"
                        >
                          Add Brand
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("importproduct-") ? "active" : ""
                          }
                          to="/peul-pos/product/importproduct-product"
                        >
                          Import Product
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("printbarcode-") ? "active" : ""
                          }
                          to="/peul-pos/product/printbarcode-product"
                        >
                          Print Barcode
                        </Link>
                      </li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/peul-pos/sales")
                        ? "active subdrop"
                        : "" || isSideMenu == "sales"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "sales" ? "" : "sales")
                    }
                  >
                    <img src={Sales1} alt="img" />
                    <span> Sales </span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "sales" ? (
                    <ul>
                      {/* <li>
                        <Link
                          className={
                            pathname.includes("saleslist") ? "active" : ""
                          }
                          to="/peul-pos/sales/saleslist"
                        >
                          Sales List
                        </Link>
                      </li> */}
                      <li>
                        <Link to="/pos">POS</Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/peul-pos/sales/add-sales"
                          className={
                            pathname.includes("add-sales") ? "active" : ""
                          }
                        >
                          New Sales
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          className={
                            pathname.includes("salesreturnlist") ? "active" : ""
                          }
                          to="/peul-pos/sales/salesreturnlist-return"
                        >
                          Sales Return List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addsalesreturn") ? "active" : ""
                          }
                          to="/peul-pos/sales/addsalesreturn-return"
                        >
                          New Sales Return
                        </Link>
                      </li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/peul-pos/inventory")
                        ? "active subdrop"
                        : "" || isSideMenu == "inventory"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "inventory" ? "" : "inventory")
                    }
                  >
                    <img src={Sales1} alt="img" />
                    <span> Inventory </span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "inventory" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("inventorylist") ? "active" : ""
                          }
                          to="/peul-pos/inventory/inventorylist"
                        >
                          Inventory List
                        </Link>
                      </li>
                      <li>
                        <Link to="/peul-pos/inventory/addinventory">Add Inventory</Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/peul-pos/purchase")
                        ? "subdrop active"
                        : "" || isSideMenu == "purchase"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "purchase" ? "" : "purchase")
                    }
                  >
                    {" "}
                    <img src={Purchase} alt="img" /> <span>Purchase</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "purchase" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("purchaselist-") ? "active" : ""
                          }
                          to="/peul-pos/purchase/purchaselist-purchase"
                        >
                          Purchase List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addpurchase-") ? "active" : ""
                          }
                          to="/peul-pos/purchase/addpurchase-purchase"
                        >
                          Add Purchase
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          className={
                            pathname.includes("importpurchase-") ? "active" : ""
                          }
                          to="/peul-pos/purchase/importpurchase-purchase"
                        >
                          Import Purchase
                        </Link>
                      </li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/peul-pos/expense")
                        ? "subdrop active"
                        : "" || isSideMenu == "expense"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "expense" ? "" : "expense")
                    }
                  >
                    {" "}
                    <img src={Expense} alt="img" /> <span>Expense</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "expense" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("expenselist-") ? "active" : ""
                          }
                          to="/peul-pos/expense/expenselist-expense"
                        >
                          Expense List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addexpense-") ? "active" : ""
                          }
                          to="/peul-pos/expense/addexpense-expense"
                        >
                          Add Expense
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          className={
                            pathname.includes("expensecategory-")
                              ? "active"
                              : ""
                          }
                          to="/peul-pos/expense/expensecategory-expense"
                        >
                          Expense Category
                        </Link>
                      </li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                {/* <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/peul-pos/quotation")
                        ? "subdrop active"
                        : "" || isSideMenu == "quotation"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "quotation" ? "" : "quotation"
                      )
                    }
                  >
                    {" "}
                    <img src={Quotation} alt="img" /> <span>Quotation</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "quotation" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("quotationlist-") ? "active" : ""
                          }
                          to="/peul-pos/quotation/quotationlist-quotation"
                        >
                          Quotation List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addquotation-") ? "active" : ""
                          }
                          to="/peul-pos/quotation/addquotation-quotation"
                        >
                          Add Quotation
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
                {/* <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/peul-pos/transfer")
                        ? "subdrop active"
                        : "" || isSideMenu == "transfer"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "transfer" ? "" : "transfer")
                    }
                  >
                    {" "}
                    <img src={Transfer} alt="img" /> <span>Transfer</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "transfer" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("transferlist-") ? "active" : ""
                          }
                          to="/peul-pos/transfer/transferlist-transfer"
                        >
                          Transfer List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addtransfer-") ? "active" : ""
                          }
                          to="/peul-pos/transfer/addtransfer-transfer"
                        >
                          Add Transfer
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("importtransfer-") ? "active" : ""
                          }
                          to="/peul-pos/transfer/importtransfer-transfer"
                        >
                          Import Transfer
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
                {/* <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/peul-pos/return")
                        ? "subdrop active"
                        : "" || isSideMenu == "return"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "return" ? "" : "return")
                    }
                  >
                    {" "}
                    <img src={Return} alt="img" /> <span>Return</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "return" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("salesreturnlist-")
                              ? "active"
                              : ""
                          }
                          to="/peul-pos/return/salesreturnlist-return"
                        >
                          Sales Return List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addsalesreturn-") ? "active" : ""
                          }
                          to="/peul-pos/return/addsalesreturn-return"
                        >
                          Add Sales Return
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("purchasereturnlist-")
                              ? "active"
                              : ""
                          }
                          to="/peul-pos/return/purchasereturnlist-return"
                        >
                          Purchase Return List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addpurchasereturn-")
                              ? "active"
                              : ""
                          }
                          to="/peul-pos/return/addpurchasereturn-return"
                        >
                          Add Purchase Return
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
                <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/peul-pos/people")
                        ? "subdrop active"
                        : "" || isSideMenu == "people"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "people" ? "" : "people")
                    }
                  >
                    {" "}
                    <img src={People} alt="img" /> <span>People</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "people" ? (
                    <ul>
                      {/* <li>
                        <Link
                          className={
                            pathname.includes("customerlist-") ? "active" : ""
                          }
                          to="/peul-pos/people/customerlist-people"
                        >
                          Customer List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addcustomer-") ? "active" : ""
                          }
                          to="/peul-pos/people/addcustomer-people"
                        >
                          Add Customer
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          className={
                            pathname.includes("supplierlist-") ? "active" : ""
                          }
                          to="/peul-pos/people/supplierlist-people"
                        >
                          Supplier List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addsupplier-") ? "active" : ""
                          }
                          to="/peul-pos/people/addsupplier-people"
                        >
                          Add Supplier
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("userlist-") ? "active" : ""
                          }
                          to="/peul-pos/people/userlist-people"
                        >
                          User List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("adduser-") ? "active" : ""
                          }
                          to="/peul-pos/people/adduser-people"
                        >
                          Add User
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          className={
                            pathname.includes("storelist-") ? "active" : ""
                          }
                          to="/peul-pos/people/storelist-people"
                        >
                          Store List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("addstore-") ? "active" : ""
                          }
                          to="/peul-pos/people/addstore-people"
                        >
                          Add Store
                        </Link>
                      </li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                {/* <li className="submenu">
                  <a
                    href="#"
                    className={
                      pathname.includes("/peul-pos/places")
                        ? "subdrop active"
                        : "" || isSideMenu == "places"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "places" ? "" : "places")
                    }
                  >
                    {" "}
                    <img src={Places} alt="img" /> <span>Places</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "places" ? (
                    <ul>
                      <li>
                        <Link
                          className={
                            pathname.includes("newcountry-") ? "active" : ""
                          }
                          to="/peul-pos/places/newcountry-places"
                        >
                          New Country
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("countrylist-") ? "active" : ""
                          }
                          to="/peul-pos/places/countrylist-places"
                        >
                          Country List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("newstate-") ? "active" : ""
                          }
                          to="/peul-pos/places/newstate-places"
                        >
                          New State
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("statelist-") ? "active" : ""
                          }
                          to="/peul-pos/places/statelist-places"
                        >
                          State List
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
                {/* <li className={pathname.includes("components") ? "active" : ""}>
                  <Link
                    to="/peul-pos/components"
                    onClick={() => toggleSidebar(isSideMenu == "" ? "" : "")}
                  >
                    {" "}
                    <FeatherIcon icon="layers" />
                    <span>Components</span>
                  </Link>
                </li>
                <li className={pathname.includes("blankpage") ? "active" : ""}>
                  <Link
                    to="/peul-pos/blankpage"
                    onClick={() => toggleSidebar(isSideMenu == "" ? "" : "")}
                  >
                    {" "}
                    <FeatherIcon icon="file" />
                    <span>Blank Page</span>
                  </Link>
                </li>
                <li className="submenu">
                  <a
                    href="#"
                    className={
                      isSideMenu == "error pages" ? "subdrop active" : ""
                    }
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "error pages" ? "" : "error pages"
                      )
                    }
                  >
                    {" "}
                    <FeatherIcon icon="alert-octagon" />
                    <span> Error Pages </span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "error pages" ? (
                    <ul>
                      <li>
                        <Link to="/error-404">404 Error </Link>
                      </li>
                      <li>
                        <Link to="/error-500">500 Error </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    className={
                      pathname.includes("/peul-pos/elements")
                        ? "subdrop active"
                        : "" || isSideMenu == "elements"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "elements" ? "" : "elements")
                    }
                  >
                    <FeatherIcon icon="box" />
                    <span>Elements </span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "elements" ? (
                    <ul>
                      <li>
                        <Link
                          to="/peul-pos/elements/sweetalerts"
                          className={
                            pathname.includes("sweetalerts") ? "active" : ""
                          }
                        >
                          Sweet Alerts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/tooltip"
                          className={
                            pathname.includes("tooltip") ? "active" : ""
                          }
                        >
                          Tooltip
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            pathname.includes("popover") ? "active" : ""
                          }
                          to="/peul-pos/elements/popover"
                        >
                          Popover
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/ribbon"
                          className={
                            pathname.includes("ribbon") ? "active" : ""
                          }
                        >
                          Ribbon
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/clipboard"
                          className={
                            pathname.includes("clipboard") ? "active" : ""
                          }
                        >
                          Clipboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/drag-drop"
                          className={
                            pathname.includes("drag-drop") ? "active" : ""
                          }
                        >
                          Drag &amp; Drop
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/rangeslider"
                          className={
                            pathname.includes("rangeslider") ? "active" : ""
                          }
                          onClick={(e) =>
                            pageRefresh("elements", "rangeslider")
                          }
                        >
                          Range Slider
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/rating"
                          className={
                            pathname.includes("rating") ? "active" : ""
                          }
                        >
                          Rating
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/toastr"
                          className={
                            pathname.includes("toastr") ? "active" : ""
                          }
                        >
                          Toastr
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/text-editor"
                          className={
                            pathname.includes("text-editor") ? "active" : ""
                          }
                        >
                          Text Editor
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/counter"
                          className={
                            pathname.includes("counter") ? "active" : ""
                          }
                        >
                          Counter
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/scrollbar"
                          className={
                            pathname.includes("scrollbar") ? "active" : ""
                          }
                        >
                          Scrollbar
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/spinner"
                          className={
                            pathname.includes("spinner") ? "active" : ""
                          }
                        >
                          Spinner
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/notification"
                          className={
                            pathname.includes("notification") ? "active" : ""
                          }
                        >
                          Notification
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/lightbox"
                          className={
                            pathname.includes("lightbox") ? "active" : ""
                          }
                        >
                          Lightbox
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/stickynote"
                          className={
                            pathname.includes("stickynote") ? "active" : ""
                          }
                        >
                          Sticky Note
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/timeline"
                          className={
                            pathname.includes("timeline") ? "active" : ""
                          }
                        >
                          Timeline
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/elements/form-wizard"
                          className={
                            pathname.includes("form-wizard") ? "active" : ""
                          }
                          onClick={(e) =>
                            pageRefresh("elements", "form-wizard")
                          }
                        >
                          Form Wizard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    className={
                      pathname.includes("/peul-pos/charts")
                        ? "subdrop active"
                        : "" || isSideMenu == "Charts"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Charts" ? "" : "Charts")
                    }
                  >
                    <FeatherIcon icon="bar-chart-2" />
                    <span> Charts</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Charts" ? (
                    <ul>
                      <li>
                        <Link
                          to="/peul-pos/charts/chart-apex"
                          className={
                            pathname.includes("chart-apex") ? "active" : ""
                          }
                        >
                          Apex Charts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/charts/chart-js"
                          className={
                            pathname.includes("chart-js") ? "active" : ""
                          }
                          onClick={(e) => pageRefresh("charts", "chart-js")}
                        >
                          Chart Js
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/charts/chart-morris"
                          className={
                            pathname.includes("chart-morris") ? "active" : ""
                          }
                        >
                          Morris Charts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/charts/chart-flot"
                          className={
                            pathname.includes("chart-flot") ? "active" : ""
                          }
                          onClick={(e) => pageRefresh("charts", "chart-flot")}
                        >
                          Flot Charts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/charts/chart-peity"
                          className={
                            pathname.includes("chart-peity") ? "active" : ""
                          }
                          onClick={(e) => pageRefresh("charts", "chart-peity")}
                        >
                          Peity Charts
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    className={
                      pathname.includes("/peul-pos/icons")
                        ? "subdrop active"
                        : "" || isSideMenu == "Icons"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Icons" ? "" : "Icons")
                    }
                  >
                    <FeatherIcon icon="award" />
                    <span> Icons</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Icons" ? (
                    <ul>
                      <li>
                        <Link
                          to="/peul-pos/icons/icon-fontawesome"
                          className={
                            pathname.includes("fontawesome") ? "active" : ""
                          }
                        >
                          Fontawesome Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/icons/icon-feather"
                          className={
                            pathname.includes("feather") ? "active" : ""
                          }
                        >
                          Feather Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/icons/icon-ionic"
                          className={pathname.includes("ionic") ? "active" : ""}
                        >
                          Ionic Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/icons/icon-material"
                          className={
                            pathname.includes("material") ? "active" : ""
                          }
                        >
                          Material Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/icons/icon-pe7"
                          className={
                            pathname.includes("icon-pe7") ? "active" : ""
                          }
                        >
                          Pe7 Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/icons/icon-simpleline"
                          className={
                            pathname.includes("simpleline") ? "active" : ""
                          }
                        >
                          Simpleline Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/icons/icon-themify"
                          className={
                            pathname.includes("themify") ? "active" : ""
                          }
                        >
                          Themify Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/icons/icon-weather"
                          className={
                            pathname.includes("weather") ? "active" : ""
                          }
                        >
                          Weather Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/icons/icon-typicon"
                          className={
                            pathname.includes("typicon") ? "active" : ""
                          }
                        >
                          Typicon Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/icons/icon-flag"
                          className={
                            pathname.includes("icon-flag") ? "active" : ""
                          }
                        >
                          Flag Icons
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    className={
                      pathname.includes("/peul-pos/forms")
                        ? "subdrop active"
                        : "" || isSideMenu == "Forms"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Forms" ? "" : "Forms")
                    }
                  >
                    <FeatherIcon icon="columns" />
                    <span> Forms</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Forms" ? (
                    <ul>
                      <li>
                        <Link
                          to="/peul-pos/forms/form-basic-inputs"
                          className={
                            pathname.includes("form-basic-inputs")
                              ? "active"
                              : ""
                          }
                        >
                          Basic Inputs{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/forms/form-input-groups"
                          className={
                            pathname.includes("form-input-groups")
                              ? "active"
                              : ""
                          }
                        >
                          Input Groups{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/forms/form-horizontal"
                          className={
                            pathname.includes("horizontal") ? "active" : ""
                          }
                        >
                          Horizontal Form{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/forms/form-vertical"
                          className={
                            pathname.includes("form-vertical") ? "active" : ""
                          }
                        >
                          {" "}
                          Vertical Form{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/forms/form-mask"
                          className={
                            pathname.includes("form-mask") ? "active" : ""
                          }
                        >
                          Form Mask{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/forms/form-validation"
                          className={
                            pathname.includes("validation") ? "active" : ""
                          }
                        >
                          Form Validation{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/forms/form-select2"
                          className={
                            pathname.includes("form-select2") ? "active" : ""
                          }
                        >
                          Form Select2{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/forms/form-fileupload"
                          className={
                            pathname.includes("fileupload") ? "active" : ""
                          }
                        >
                          File Upload{" "}
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    className={
                      pathname.includes("/peul-pos/table")
                        ? "subdrop active"
                        : "" || isSideMenu == "Table"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Table" ? "" : "Table")
                    }
                  >
                    <FeatherIcon icon="layout" />
                    <span> Table</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Table" ? (
                    <ul>
                      <li>
                        <Link
                          to="/peul-pos/table/tables-basic"
                          className={
                            pathname.includes("tables-basic") ? "active" : ""
                          }
                        >
                          Basic Tables{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/table/data-tables"
                          className={
                            pathname.includes("data-tables") ? "active" : ""
                          }
                        >
                          Data Table{" "}
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    className={
                      pathname.includes("/peul-pos/application")
                        ? "subdrop active"
                        : "" || isSideMenu == "Application"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "Application" ? "" : "Application"
                      )
                    }
                  >
                    <img src={Product} alt="img" />
                    <span> Application</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Application" ? (
                    <ul>
                      <li>
                        <Link
                          to="/peul-pos/application/chat"
                          className={pathname.includes("chat") ? "active" : ""}
                        >
                          Chat
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/application/calendar"
                          className={
                            pathname.includes("calendar") ? "active" : ""
                          }
                        >
                          Calendar
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/application/email"
                          className={pathname.includes("email") ? "active" : ""}
                        >
                          Email
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
                <li className="submenu">
                  <Link
                    to="#"
                    className={
                      pathname.includes("/peul-pos/report")
                        ? "subdrop active"
                        : "" || isSideMenu == "Report"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Report" ? "" : "Report")
                    }
                  >
                    <img src={Time} alt="img" />
                    <span> Report</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Report" ? (
                    <ul>
                      {/* <li>
                        <Link
                          to="/peul-pos/report/purchaseorderreport"
                          className={
                            pathname.includes("purchaseorderreport")
                              ? "active"
                              : ""
                          }
                        >
                          Purchase order report
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to="/peul-pos/report/inventoryreport"
                          className={
                            pathname.includes("inventoryreport") ? "active" : ""
                          }
                        >
                          Inventory Report
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/peul-pos/report/salesreport"
                          className={
                            pathname.includes("salesreport") ? "active" : ""
                          }
                        >
                          Sales Report
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/report/invoicereport"
                          className={
                            pathname.includes("invoicereport") ? "active" : ""
                          }
                        >
                          Invoice Report
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/report/purchasereport"
                          className={
                            pathname.includes("purchasereport") ? "active" : ""
                          }
                        >
                          Purchase Report
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/report/supplierreport"
                          className={
                            pathname.includes("supplierreport") ? "active" : ""
                          }
                        >
                          Supplier Report
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          to="/peul-pos/report/customerreport"
                          className={
                            pathname.includes("customerreport") ? "active" : ""
                          }
                        >
                          Customer Report
                        </Link>
                      </li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                {/* <li className="submenu">
                  <Link
                    to="#"
                    className={
                      pathname.includes("/peul-pos/users")
                        ? "subdrop active"
                        : "" || isSideMenu == "Users"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Users" ? "" : "Users")
                    }
                  >
                    <img src={Users1} alt="img" />
                    <span> Users</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Users" ? (
                    <ul>
                      <li>
                        <Link
                          to="/peul-pos/users/newuser"
                          className={
                            pathname.includes("newuser") ? "active" : ""
                          }
                        >
                          New User{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/users/userlists"
                          className={
                            pathname.includes("userlists") ? "active" : ""
                          }
                        >
                          Users List
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
                {/* <li className="submenu">
                  <Link
                    to="#"
                    className={
                      pathname.includes("/peul-pos/settings")
                        ? "subdrop active"
                        : "" || isSideMenu == "Settings"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Settings" ? "" : "Settings")
                    }
                  >
                    <img src={settings} alt="img" />
                    <span> Settings</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Settings" ? (
                    <ul>
                      <li>
                        <Link
                          to="/peul-pos/settings/generalsettings"
                          className={
                            pathname.includes("generalsettings") ? "active" : ""
                          }
                        >
                          General Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/settings/emailsettings"
                          className={
                            pathname.includes("emailsettings") ? "active" : ""
                          }
                        >
                          Email Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/settings/paymentsettings"
                          className={
                            pathname.includes("paymentsettings") ? "active" : ""
                          }
                        >
                          Payment Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/settings/currencysettings"
                          className={
                            pathname.includes("currencysettings")
                              ? "active"
                              : ""
                          }
                        >
                          Currency Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/settings/grouppermissions"
                          className={
                            pathname.includes("permission") ? "active" : ""
                          }
                        >
                          Group Permissions
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peul-pos/settings/taxrates"
                          className={
                            pathname.includes("taxrates") ? "active" : ""
                          }
                        >
                          Tax Rates
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>    
  );
};

export default withRouter(Sidebar);
