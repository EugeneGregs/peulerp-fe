import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import SignUp from "./SignUp";
import Pos from "./pos/pos";
import Error404 from "../MainPage/ErrorPage/Error404";
import Error500 from "../MainPage/ErrorPage/Error500";
import DefaultLayout from "./Sidebar/DefaultLayout";
import RequireAuth from "../MainPage/auth/RequireAuth";
import ResetPassword from "./ResetPassword";

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("location");
    // console.log(pathname);

    if (pathname === "/") {
      navigate("/peul-pos/dashboard");
    }

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
      <Routes>
        {/* Public Routes */}
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/changePassword" element={<ResetPassword />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/peul-pos/*" element={<DefaultLayout />} />
        </Route>

        {/* Error Routes */}
        <Route path="/error-500" element={<Error500 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
