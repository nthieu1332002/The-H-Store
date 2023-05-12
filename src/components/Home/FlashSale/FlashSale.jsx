import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import FlashSaleItem from "../FlashSaleItem/FlashSaleItem.jsx";
import Timer from "../../Timer/Timer";
import "./style.scss";

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const random = Math.floor(Math.random() * 100) + 1;
      const api = await fetch(`https://api.escuelajs.co/api/v1/products`);
      const data = await api.json();
      setProducts(data.slice(random, random + 6));
      setIsLoading(false);
    };
    getProducts();
  }, []);

  return (
    <div className="flash-sale-container">
      <div className="flash-sale-header">
        <h3>Flash Sale ⚡</h3>
        <div className="flash-sale-timer">
          <Timer />
          <Link to="/products" className="view-all">
            View all
            <MdNavigateNext className="view-all-icon" />
          </Link>
        </div>
      </div>
      <div className="flash-sale-content">
        {products.map((item) => {
          return <FlashSaleItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default FlashSale;
