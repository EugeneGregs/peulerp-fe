import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProductRoute = ({ match }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/peul-pos/product") {
      navigate(`${pathname}/productlist-product`);
    }
  }, []);

  console.log("pathname product: ");
  console.log(pathname);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProductRoute;
