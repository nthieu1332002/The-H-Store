import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { MdNavigateNext } from "react-icons/md";
import CardCategory from "../CardCategory/CardCategory.jsx";
import "./style.scss";
import img1 from "../../../images/cate-clothes.png"
import img2 from "../../../images/cate-electronic.png"
import img3 from "../../../images/cate-furniture.png"
import img4 from "../../../images/cate-shoes.png"

const categories = [
  {
    id: 1,
    name: "Clothes",
    img: img1
  },
  {
    id: 2,
    name: "Electronic",
    img: img2
  },
  {
    id: 3,
    name: "Furnitures",
    img: img3
  },
  {
    id: 4,
    name: "Shoes",
    img: img4
  }
];

const CategoryHome = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="homepage-category">
      <div className="category-header">
        <h3>Category</h3>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="category-content">
          {categories.map((item) => {
            return <CardCategory key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryHome;
