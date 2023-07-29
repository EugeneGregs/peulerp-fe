import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? <Outlet /> : <Navigate to="/signIn" state={{from: location}} replace/>;
};

export default RequireAuth;
