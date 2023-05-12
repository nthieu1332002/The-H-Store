import React, { useEffect, useState } from "react";
import CardProduct from "../CardProduct/CardProduct";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import Loading from "../../Loading/Loading";
import "./ProductHome.scss";

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const api = await fetch(`https://api.escuelajs.co/api/v1/products`);
      const data = await api.json();
      setProducts(data.slice(0, 9));
      setIsLoading(false);
    };
    getProducts();
  }, []);

  return (
    <>
      <div className="homepage-product">
        <div className="product-header">
          <h3>New products</h3>
          <Link to="/products" className="view-all">
            View all
            <MdNavigateNext className="view-all-icon" />
          </Link>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="product-body">
            {products.map((item) => {
              return <CardProduct key={item.id} item={item} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductHome;
