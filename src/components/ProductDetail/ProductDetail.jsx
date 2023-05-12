import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./ProductDetail.scss";

import Loading from "../Loading/Loading";
import { FaMinus, FaPlus } from "react-icons/fa";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { toast } from "react-toastify";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

import { useSelector } from "react-redux";

import HeartIcon from "../HeartIcon/HeartIcon";

const ProductDetail = () => {
  let params = useParams();
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFavorite, setIsFavorite] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isActive, setIsActive] = useState(0);

  const { increaseChooseQuantity } = useShoppingCart();

  const { favorite } = useSelector((state) => state.favorite);
  useEffect(() => {
    const getDetail = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const api = await fetch(
          `https://api.escuelajs.co/api/v1/products/${params.id}`
        );
        const data = await api.json();
        setDetail(data);
        if (data.error) {
          throw data.message;
        }
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
      const existed = favorite.some((item) => item.id === detail.id);
      if (existed) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    };
    getDetail();
  }, [params.id, detail.id, favorite]);

  const handleSubmit = (e) => {
    e.preventDefault();
    increaseChooseQuantity(detail, quantity);
    toast.success("Add to cart successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="detail-container">
        {isError ? (
          <div className="error">Oh no!<br/> Something went wrong.<br/>Please try again.</div>
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="detail-images">
              <div className="image-display">
                <InnerImageZoom
                  src={detail?.images?.[isActive]}
                  zoomSrc={detail?.images?.[isActive]}
                  zoomType="hover"
                  zoomPreload={true}
                  zoomScale="1.5"
                />
              </div>
              <div className="image-list">
                {detail.images?.map((item, index) => {
                  return (
                    <div
                      className="image-container"
                      key={index}
                      onClick={() => setIsActive(index)}
                    >
                      <img src={item} alt={index} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="detail-info">
              <div className="detail-info-title">
                <h2>
                  {detail.title} |{" "}
                  <span className="the-h-store">The H Store</span>
                </h2>
              </div>
              <h5>Up to 15% off</h5>
              <h2 className="detail-price">
                $ {detail.price}.00{" "}
                <sup>
                  <del>${Math.round(detail.price * 1.2)}.00</del>
                </sup>
              </h2>
              <p>
                <span>Category: </span> {detail.category?.name}.
              </p>
              <p className="detail-description">
                <span>Description: </span>
                {detail.description}.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="select-quantity">
                  <div className="btn minus" onClick={decreaseQuantity}>
                    <FaMinus />
                  </div>
                  <input
                    className="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    min="1"
                    max="100"
                  />
                  <div className="btn plus" onClick={increaseQuantity}>
                    <FaPlus />
                  </div>
                </div>
                <div className="action">
                  <button className="add-to-cart" type="submit">
                    Add to cart
                  </button>
                  <HeartIcon
                    isFavorite={isFavorite}
                    setIsFavorite={(item) => setIsFavorite(item)}
                    detail={detail}
                  />
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
