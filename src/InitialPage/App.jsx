import React, { Component, useEffect } from "react";
import { Navigate, Route, Routes, Switch } from "react-router-dom";

import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import SignUp from "./SignUp";
import Pos from "./pos/pos";
import DefaultLayout from "./Sidebar/DefaultLayout";

import Error404 from "../MainPage/ErrorPage/Error404";
import Error500 from "../MainPage/ErrorPage/Error500";
import { useLocation } from "react-router-dom";

const App = () => {
  const { pathname } = useLocation();

//   if (pathname === "/") {
//     return <Navigate to={"/signIn"} replace={true} />;
//   }

  useEffect(() => {
    console.log("location");
    console.log(pathname);
    if (
      pathname.includes("signIn") ||
      pathname.includes("signUp") ||
      pathname.includes("forgetPassword")
    ) {
      $("body").addClass("account-page");
    }
  }, []);

  return (
    <>
    <SignIn />
      {/* <Routes> */}
        {/* Public Routes */}
        {/* <Route path="/signIn" element={<SignIn />} />
        <Route path="/forgetPassword" component={ForgetPassword} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/error-404" component={Error404} />
        <Route path="/error-500" component={Error500} />
        <Route path="/pos" component={Pos} /> */}

        {/* Private Routes */}
        {/* <Route path="/dream-pos" component={DefaultLayout} />
      </Routes> */}
    </>
  );
};

export default App;
