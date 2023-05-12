import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaMinus, FaPlus } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite } from "../../store/Favorite/FavoriteSlice";

import HeartIcon from "../HeartIcon/HeartIcon"

const CartItem = ({ item }) => {
  const {
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    chooseQuantity,
  } = useShoppingCart();

  const { favorite } = useSelector((state) => state.favorite);

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    const getDetail = async () => {
      const existed = favorite.some((like) => like.id === item.id);
      if (existed) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    };
    getDetail();
  }, [item.id, favorite]);

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

  const decreaseQuantity = (item) => {
    decreaseCartQuantity(item);
    toast.success("Increase quantity successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };
  const increaseQuantity = (item) => {
    increaseCartQuantity(item);
    toast.success("Decrease quantity successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  const chooseQuantityCart = (id, quantity) => {
    if (quantity > 0 || Number.isInteger(quantity)) {
      let num = parseInt(quantity);
      chooseQuantity(id, num);
      toast.success("Update quantity successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "foo-bar",
      });
    } else {
      toast.error("Quantity must be empty and positive!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "foo-bar",
      });
    }
  };


  return (
    <tr>
      <td>
        <div
          className="remove-item"
          onClick={() => {
            removeItem(item.id);
          }}
        >
          <AiOutlineDelete />
        </div>
      </td>
      <td className="image">
        <img src={item.images?.[0]} alt="" />
      </td>
      <td>
        <div className="product-info">
          <h4 onClick={() => handleDetail(item.id)}>
            {item.title} - The H Store
          </h4>
          <div className="select-quantity">
            <div className="btn minus" onClick={() => decreaseQuantity(item)}>
              <FaMinus />
            </div>
            <input
              className="quantity"
              value={item.qty}
              onChange={(e) => chooseQuantityCart(item.id, e.target.value)}
              type="number"
              min="1"
            />
            <div className="btn plus" onClick={() => increaseQuantity(item)}>
              <FaPlus />
            </div>
          </div>
        </div>
      </td>
      <td className="price">$ {item.price * item.qty}.00</td>
      <td>
        <HeartIcon
          isFavorite={isFavorite}
          setIsFavorite={(item) => setIsFavorite(item)}
          detail={item}
        />
      </td>
    </tr>
  );
};

export default CartItem;
