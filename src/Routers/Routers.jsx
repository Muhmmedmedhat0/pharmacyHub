import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../Components/header/Header";
import Footer from "../Components/Footer/Footer";
import Cares from "../Pages/Cares/Cares";
import Medicine from "../Pages/Medicine/Medicine";
import Vitamins from "../Pages/Vitamins/Vitamins";
import Equipments from "../Pages/Equipments/Equipments";
import SignUp from "../Pages/SignUp/SignUp";
import LogIn from "../Pages/LogIn/LogIn";
import Home from "../Pages/Home/Home";
import Carts from "../Pages/Carts/Carts";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Billing from "../Components/Billing/Billing";
import ProductsDetails from "../Pages/ProductsDetails/ProductsDetails"; // New component for product details
import Checkout from "../Pages/Checkout/Checkout";
import Dashboard from "../admin/Dashboard";
import AllProduct from "../admin/AllProduct";
import OurTeam from "../Pages/OurTeam/OurTeam";
import Profile from "../Pages/Profile/Profile";
import Order from "../Pages/Order/Order";
import CategoryView from "../Pages/CategoryView/CategoryView";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      {/* Redirect from root to /home */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="home" element={<Home />} />
      <Route path="logIn" element={<LogIn />} />

      <Route element={<ProtectedRoute />}>

        <Route path="carts" element={<Carts />} />
      <Route path="billing" element={<Billing />} />
      <Route path="/checkout" element={<Checkout />} />
        
      </Route>
      {/* <Route path="header" element={<Header />} />
      <Route path="footer" element={<Footer />} /> */}
      <Route path="cares" element={<Cares />} />
      <Route path="medicine" element={<Medicine />} />
      <Route path="vitamins" element={<Vitamins />} />
      <Route path="equipments" element={<Equipments />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="order" element={<Order />} />
      <Route path="product/:id" element={<ProductsDetails />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="dashboard/allProduct" element={<AllProduct />} />
      <Route path="ourTeam" element={<OurTeam />} />
      <Route path="profile" element={<Profile />} />
      <Route path="/category/:categoryId" component={CategoryView} />
      <Route path="/medicine/:id" element={<Medicine />} />

      {/* New route for product details */}
    </Routes>
  );
};

export default Routers;
