import React,{ useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/Profile/SideBar/SideBar";
import logo from "../../images/logo.png";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocFromCache,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";


import "./style.scss";

const Profile = () => {
  const { user, profile } = useSelector((state) => state.user);

  return (
    <div className="profile-container">
      <div className="side-bar-container">
        <div className="shortcut-profile">
          <div className="avatar">
            <img src={logo} alt="avatar" />
          </div>
          <div className="info">
            <h4>{profile?.firstName || user.email}</h4>
            <p>{user.email}</p>
          </div>
        </div>
        <SideBar />
      </div>
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
