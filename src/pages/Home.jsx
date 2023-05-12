import React from "react";
import Slider from "../components/Home/Slider/Slider";
import FlashSale from "../components/Home/FlashSale/FlashSale.jsx"
import ProductHome from "../components/Home/ProductHome/ProductHome";
import CategoryHome from "../components/Home/CategoryHome/CategoryHome";

const Home = () => {
  return (
    <>
      <Slider/>
      <CategoryHome/>
      <FlashSale/>
      <ProductHome/>
    </>
  );
};

export default Home;
