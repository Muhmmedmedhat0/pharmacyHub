import React from "react";
import { Outlet, Navigate } from "react-router-dom";
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const ProtectedRoute = () => {
  const USERID = getCookie("id");
console.log(USERID)
  return USERID ? <Outlet /> : <Navigate to="/" />;
};


export default ProtectedRoute;
