import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteItem from "../../../components/FavoriteItem";
import { getFavoriteFilter } from "../../../store/Favorite/FavoriteSlice";
import { BiSearch } from "react-icons/bi";
import "./style.scss";
import Pagination from "../../../components/Pagination";

const limit = 6;

const Favorite = () => {
  const { favorite, totalFavoritePage } = useSelector(
    (state) => state.favorite
  );

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const currentFavorite = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * limit;
    const lastPageIndex = firstPageIndex + limit;
    return favorite.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, favorite]);

  const onChangeSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchValue(e.target.value);
    dispatch(getFavoriteFilter(e.target.value));
  };

  return (
    <>
      <div className="favorite-header">
        <div className="favorite-title">
          <h1>Favorites</h1>
          <p>Find your saved items and get ready to order them.</p>
        </div>
        <div className="favorite-search">
          <input
            type="text"
            placeholder="Search favorites.."
            value={searchValue}
            onChange={onChangeSearch}
          />
          <BiSearch className="search-icon" />
        </div>
      </div>
      {currentFavorite.length > 0 ? (
        <>
          <div className="favorite-pagination">
            <Pagination
              totalPage={totalFavoritePage}
              handleOnChange={(page) => setCurrentPage(page)}
              currentPage={currentPage}
            />
          </div>
          <div className="favorite-item-wrapper">
            {currentFavorite.map((item) => {
              return <FavoriteItem key={item.id} item={item} />;
            })}
          </div>
        </>
      ) : (
        <div className="favorite-null">
          <h3>Cannot find any item in your favorites list 😓</h3>
        </div>
      )}
    </>
  );
};

export default Favorite;
