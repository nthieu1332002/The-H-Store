import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import badge from "../../../images/sale_badge.png";
import "./style.scss";

const FlashSaleItem = ({ item }) => {
  const navigate = useNavigate();
  const handleDetail = () => {
    navigate("/productdetail/" + item.id);
  };
  return (
    <div className="flash-sale-item" onClick={handleDetail}>
      <div className="item-img">
        <img
          src={item.images.length === 3 ? item.images?.[0] : logo}
          alt={item.title}
        />
        <div className="badge">
          <img src={badge} alt="badge" />
        </div>
      </div>
      <div className="item-detail">
        <h5>{item.title}</h5>
        <h3>${item.price}.00</h3>
      </div>
    </div>
  );
};

export default FlashSaleItem;
