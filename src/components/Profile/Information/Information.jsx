import React, { useState, useEffect } from "react";
import logo from "../../../images/logo.png";
import { BsCameraFill } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import { setProfile } from "../../../store/User/UserSlice";
import FormChangePassword from "../FormChangePassword/FormChangePassword";

const Information = () => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [lastName, setLastName] = useState(profile?.lastName || "");
  const [phone, setPhone] = useState(profile?.phone || "");

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const data = {
      uid: user.uid,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    };
    dispatch(setProfile(data));
  };

  return (
    <div className="information-container">
      <div className="information-title">
        <h1>Information</h1>
      </div>
      <div className="information-content">
        <div className="avatar-action">
          <h3>Avatar</h3>
          <div className="avatar">
            <img src={logo} alt="avatar" />
            <label htmlFor="image-upload" className="icon-camera">
              <BsCameraFill />
              <input
                type="file"
                id="image-upload"
                accept="image/x-png,image/gif,image/jpeg"
              />
            </label>
          </div>
        </div>
        <form className="form-information" onSubmit={handleUpdateInfo}>
          <h3>Detail</h3>
          <div className="form-container">
            <div className="name">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
            <input
              type="text"
              value={user.email}
              placeholder="Email"
              disabled
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
          </div>
          <div className="btn">
            <button type="submit">Save changes</button>
          </div>
        </form>
      </div>
      <div className="change-password-container">
        <h3>Change password</h3>
        <FormChangePassword />
      </div>
    </div>
  );
};

export default Information;
