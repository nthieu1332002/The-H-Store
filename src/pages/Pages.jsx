import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import SignIn from "./UserAction/SignIn";
import SignUp from "./UserAction/SignUp";
import Products from "./Products/Products";
import Profile from "./Profile/Profile";
import Cart from "./Cart/Cart";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Information from "../components/Profile/Information/Information";
import Favorite from "../components/Profile/Favorite";
import Order from "../components/Profile/Order/Order";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

const Pages = () => {
  const { user } = useSelector((state) => state.user);
  const RequireAuth = ({ children }) => {
    return Object.keys(user).length !== 0  ? (
      children
    ) : (
      <>
        <Navigate
          to="/signin"
          toast={toast.error("You must login to access this content!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "foo-bar",
          })}
        />
      </>
    );
  };

  return (
    <>
      {/* <ShoppingCartProvider> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/profile"
          element={
            // <RequireAuth>
              <Profile />
            
          }
        >
          <Route path="information" element={<Information />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="order" element={<Order />} />
        </Route>
        <Route path="/productdetail/:id" element={<ProductDetail />} />
      </Routes>
      {/* </ShoppingCartProvider> */}
    </>
  );
};

export default Pages;
