import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaMoneyBill } from "react-icons/fa";
import { RiHeart2Fill } from "react-icons/ri";

import "./style.scss";

const SideBarLink = [
  {
    id: 1,
    link: "information",
    name: "My Information",
    icon: FaUser,
  },
  {
    id: 2,
    link: "favorite",
    name: "My Favorites",
    icon: RiHeart2Fill,
  },

  {
    id: 3,
    link: "order",
    name: "My Orders",
    icon: FaMoneyBill,
  }
];

const SideBar = () => {
  const navigate = useNavigate();

  const handleClickLink = (link) => {
    console.log(link)
    navigate(link);
  };

  return (
    <div className="side-bar-list">
      {SideBarLink.map((item) => {
        return (
          <div
            className="side-bar-item"
            key={item.id}
            onClick={() => handleClickLink(item.link)}
          >
            <div className="link-icon">
              <item.icon />
            </div>
            <div className="link-name">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
