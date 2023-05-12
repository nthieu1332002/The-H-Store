import React, { useContext, useEffect, useReducer } from "react";
import LikeReducer, { initialState } from "./LikeReducer";

const LikeContext = React.createContext(initialState);

export const useLike = () => {
  return useContext(LikeContext);
};

export const LikeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LikeReducer, initialState);
  useEffect(() => {
    localStorage.setItem("like", JSON.stringify(state.like));
  }, [state.like]);

  const addLike = (item) => {
    dispatch({
      type: "ADD_LIKE",
      payload: item,
    });
  };

  // const removeLike = (id) => {
  //   dispatch({
  //     type: "REMOVE_LIKE",
  //     payload: id,
  //   });
  // };


  return (
    <LikeContext.Provider value={{ state, dispatch, addLike}}>
      {children}
    </LikeContext.Provider>
  );
};
