import React, { useEffect, useState, useMemo, useCallback } from "react";
import Slider from "@mui/material/Slider";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import CardProduct from "../../components/Product/CardProduct.jsx";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import {
  getProductList,
  getCategoryList,
  chooseCategory,
} from "../../store/Product/ProductSlice";

import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination";

const limit = 6;
const min = 0;
const max = 1200;
const Products = () => {
  var val = [min, max];
  const dispatch = useDispatch();
  let { productList, categoryList, totalProductPage, setCategory } =
    useSelector((state) => state.product);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(true);
  const [cateFilter, setCateFilter] = useState(setCategory);
  const [products, setProducts] = useState(productList);
  const [price, setPrice] = useState(val);
  const [totalPage, setTotalPage] = useState(totalProductPage);

  const updateProduct = useCallback(() => {
    let temp = productList;

    if (cateFilter > 0) {
      temp = temp.filter((item) => item.category.id === cateFilter);
    }
    if (price[0] !== min || price[1] !== max) {
      temp = temp.filter(
        (item) => price[0] <= item.price && item.price <= price[1]
      );
    }
    if (sortBy === true) {
      temp = [...temp].sort((a, b) => (a.price > b.price ? 1 : -1));
    }
    if (sortBy === false) {
      temp = [...temp].sort((a, b) => (a.price > b.price ? -1 : 1));
    }
    setCurrentPage(1);

    setProducts(temp);
    setTotalPage(Math.ceil(temp.length / limit));
  }, [productList, cateFilter, price, sortBy]);

  useEffect(() => {
    updateProduct();
  }, [updateProduct]);

  const currentProducts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * limit;
    const lastPageIndex = firstPageIndex + limit;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  useEffect(() => {
    const dataFilter = {
      category: 0,
      value: "",
    };
    dispatch(getProductList(dataFilter));
  }, [dispatch]);

  const handleChangePrice = (e, value) => {
    setPrice(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    const dataFilter = {
      category: 0,
      value: searchValue,
    };
    dispatch(getProductList(dataFilter));
  };

  return (
    <div className="product-container">
      <div className="product-filter">
        <div className="filter-header">
          <p>Filter</p>
        </div>
        <div className="filter-category">
          <p className="cate-header">Categories</p>

          <p>
            <input
              type="radio"
              id="all"
              name="radio-group"
              value={cateFilter}
              onChange={() => {
                setCateFilter(0);
                dispatch(chooseCategory(0));
              }}
              checked={cateFilter === 0}
            />
            <label htmlFor="all">All</label>
          </p>
          {categoryList.map((item) => {
            return (
              <p key={item.id}>
                <input
                  type="radio"
                  id={item.id}
                  value={item.id}
                  onChange={() => {
                    setCateFilter(item.id);
                    dispatch(chooseCategory(item.id));
                  }}
                  checked={cateFilter === item.id}
                  name="radio-group"
                />
                <label htmlFor={item.id}>{item.name}</label>
              </p>
            );
          })}
        </div>
        <div className="filter-price">
          <p className="cate-header">Price</p>
          <div className="price-selector">
            <Slider
              min={min}
              step={200}
              max={max}
              value={price}
              onChange={handleChangePrice}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => <>${value}</>}
              color="secondary"
              size="small"
              disableSwap
            />
          </div>
        </div>
      </div>
      <div className="product-content">
        <div className="product-search">
          <form onSubmit={handleSearch}>
            <div className="filter-search">
              <input
                type="text"
                placeholder="Search product.."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <BiSearch className="search-icon" />
              {searchValue ? (
                <MdClear className="clear" onClick={() => setSearchValue("")} />
              ) : (
                ""
              )}
            </div>
          </form>

          <div className="filter-sort">
            <p>
              Sort by:{"   "}
              <span
                className={"sort-by" + (sortBy ? " active" : "")}
                onClick={() => setSortBy(!sortBy)}
              >
                {sortBy ? <>Price Increase</> : <>Price Decrease</>}
              </span>
            </p>
          </div>
        </div>
        <div className="favorite-pagination">
          <Pagination
            totalPage={totalPage}
            handleOnChange={(page) => setCurrentPage(page)}
            currentPage={currentPage}
          />
        </div>
        {currentProducts.length === 0 ? (
          <div className="not-found">
            <h3>Cannot find any item 😓</h3>
            <h4>Try another word.</h4>
          </div>
        ) : (
          <div className="product-wrapper">
            {currentProducts.map((item) => {
              return <CardProduct key={item.id} item={item}></CardProduct>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
