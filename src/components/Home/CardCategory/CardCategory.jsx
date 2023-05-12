import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./style.scss";
import { chooseCategory } from "../../../store/Product/ProductSlice";

const CardCategory = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategory = () => {
    dispatch(chooseCategory(item.id))
    navigate("/products/");
  };
  return (
    <div className="category-item" onClick={handleCategory}>
      <div className="category-item-header">
        <h4>{item.name}</h4>
      </div>
      <div className="category-img">
        <img src={item.img} alt={item.name} />
      </div>
    </div>
  );
};

export default CardCategory;
