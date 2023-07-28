import React from "react";
import { Outlet } from "react-router-dom";

const PeopleIndex = ({ match }) => (
  <>
    <Outlet />
  </>
);

export default PeopleIndex;
