import React, { useState, useEffect, useCallback } from "react";
import { BiLastPage, BiFirstPage } from "react-icons/bi";
import "./style.scss";

const Pagination = ({ totalPage, currentPage, handleOnChange }) => {
  const total = Array.from({ length: totalPage }, (_, i) => i + 1);
  const [array, setArray] = useState(total);
  useEffect(() => {
    let temp = total;
    const DOT = ["..."];
    if (totalPage > 6) {

      if (currentPage < 3 || currentPage > totalPage - 2) {
        temp = total
          .slice(0, 3)
          .concat(DOT, total.slice(totalPage - 3, totalPage));
      } else if (currentPage >= 3 && currentPage <= totalPage - 2) {
        temp = DOT.concat(total.slice(currentPage - 2, currentPage + 1), DOT);
      } else {
        temp = [...total];
      }
    }
    setArray(temp);
  }, [currentPage, totalPage]);

  return (
    <div className="pagination">
      <div
        className={"index " + (currentPage === 1 ? "inactive" : "")}
        onClick={() => handleOnChange(1)}
      >
        <BiFirstPage />
      </div>
      {array.map((item, index) => {
        return (
          <div
            className={
              "index " +
              (currentPage === item ? "active" : "") +
              (item === "..." ? " inactive" : "")
            }
            key={index}
            onClick={() => handleOnChange(item)}
          >
            {item}
          </div>
        );
      })}
      <div
        className={"index " + (currentPage === totalPage ? "inactive" : "")}
        onClick={() => handleOnChange(totalPage)}
      >
        <BiLastPage />
      </div>
    </div>
  );
};

export default Pagination;
