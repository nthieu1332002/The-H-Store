import React from "react";
import { useNavigate } from "react-router-dom";

import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";
const CartHeaderItem = ({ item }) => {
  const navigate = useNavigate();
  const {
    removeFromCart,
  } = useShoppingCart();

  const removeItem = (id) => {
    removeFromCart(id);
    toast.success("Remove item successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  const handleDetail = (id) => {
    navigate("/productdetail/" + id);
  };

  return (
    <div className="cart-dropdown-item">
      <div className="item-image">
        <img src={item.images?.[0]} alt="" />
      </div>
      <div className="item-detail">
        <div className="item-title" onClick={() => handleDetail(item.id)}>{item.title}</div>
        <div className="item-price">{item.qty} x <span>${item.price}.00</span></div>
      </div>
      <div className="item-delete">
        <FiDelete onClick={() => removeItem(item.id)}/>
      </div>
    </div>
  );
};

export default CartHeaderItem;
