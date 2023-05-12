import React from "react";
import { RiHeart2Line, RiHeart2Fill } from "react-icons/ri";

import { useDispatch } from "react-redux";
import { addFavorite } from "../../store/Favorite/FavoriteSlice";
import "./style.scss"

const HeartIcon = ({ isFavorite, detail, setIsFavorite }) => {

  const dispatch = useDispatch();
  const handleAddFavorite = () => {
    dispatch(addFavorite(detail));
    setIsFavorite(!isFavorite);
  };

  return (
    <span className="favorite" onClick={handleAddFavorite}>
      {isFavorite ? <RiHeart2Fill /> : <RiHeart2Line />}
    </span>
  );
};

export default HeartIcon;
