import { Route, Routes, useLocation } from "react-router-dom";
import routerService from "../../Router";
import Header from "./Header";
import Sidebar from "./sidebar";
import React from "react";

const DefaultLayout = (props) => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <Routes>
          {routerService &&
            routerService.map((route, key) => (
              <Route key={key} path={route.path} element={route.component} />
            ))}
        </Routes>
        <Sidebar />
      </div>
      <div className="sidebar-overlay"></div>
    </>
  );
};

export default DefaultLayout;
