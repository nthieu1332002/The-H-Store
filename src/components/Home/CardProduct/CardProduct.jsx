import React from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../../Context/ShoppingCartContext";
import logo from "../../../images/logo.png"
import { FaEye, FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import "./CardProduct.scss";

const CardProduct = ({ item }) => {
  const navigate = useNavigate();
  const {
    increaseCartQuantity
  } = useShoppingCart();

  const handleDetail = (id) => {
    navigate("/productdetail/" + id);
  };

  const handleCart = () => {
    increaseCartQuantity(item);
    toast.success("Add to cart successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  return (
    <div className="card-container">
      <img src={item.images.length === 3 ? item.images?.[0] : logo} alt={item.title} />
      {/* <img src={item.image} alt={item.title} /> */}

      <div className="item-badge-detail">
        <h3>{item.title}</h3>
        <h4>${item.price}.00</h4>
      </div>
      <div className="btn-wrapper">
        <div className="btn btn-1" onClick={() => handleDetail(item.id)}>
          <FaEye />
        </div>

        <div
          className="btn btn-2"
          onClick={handleCart}
        >
          <FaCartPlus />
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
