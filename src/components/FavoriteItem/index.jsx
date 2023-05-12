import React from "react";
import { useNavigate } from "react-router-dom";

import HeartIcon from "../../components/HeartIcon/HeartIcon"

const FavoriteItem = ({ item }) => {
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate("/productdetail/" + id);
  };

  return (
    <div className="favorite-item">
      <img src={item.images?.[0]} alt={item.title} />
      <div className="item-detail">
        <div className="item-title">
          <h3 onClick={() => handleDetail(item.id)}>{item.title}</h3>
        </div>
        <div className="item-price">
          <h4>${item.price}.00</h4>
        </div>
        <div className="item-category">
          <p>{item.category?.name}</p>
        </div>
        <div className="item-action">
          <HeartIcon isFavorite={true} detail={item}/>
          <button onClick={() => handleDetail(item.id)}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
