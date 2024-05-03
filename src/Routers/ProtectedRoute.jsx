import React from "react";
import { Outlet, Navigate } from "react-router-dom";
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const deleteCookie = (name) => {
  // Set the expiration date in the past
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
const ProtectedRoute = () => {
  const USERID = getCookie("id");
console.log(USERID)
  return USERID ? <Outlet /> : <Navigate to="/" />;
};


export default ProtectedRoute;
