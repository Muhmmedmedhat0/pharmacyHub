import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const ProtectedRoute = () => {
  const token = getCookie("token");
console.log(token)
  return token ? <Outlet /> : <Navigate to="/" />;
};


export default ProtectedRoute;
