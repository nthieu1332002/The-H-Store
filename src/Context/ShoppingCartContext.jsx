import React, { createContext, useContext, useEffect, useReducer } from "react";
import ShoppingCartReducer, { initialState } from "./ShoppingCartReducer";

const ShoppingCart = createContext(initialState);

const ShoppingCartContext = ({ children }) => {
  const [state, dispatch] = useReducer(ShoppingCartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
    localStorage.setItem("total-money", JSON.stringify(state.totalMoney));
    dispatch({type:"GET_TOTAL_MONEY"})
  }, [state.cart, state.totalMoney]);

  const increaseCartQuantity = (item) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: item,
    });
  };

  const decreaseCartQuantity = (item) => {
    if (item.qty === 1) {
      removeFromCart(item.id);
    } else {
      dispatch({
        type: "DECREASE_QUANTITY",
        payload: item,
      });
    }
  };

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const increaseChooseQuantity = (item, quantity) => {
    dispatch({
      type: "INCREASE_CHOOSE_QUANTITY",
      payload: { item, quantity },
    });
  };

  const chooseQuantity = (id, quantity) => {
    dispatch({
      type: "CHOOSE_QUANTITY",
      payload: {
        id,
        quantity,
      },
    });
  };

  return (
    <ShoppingCart.Provider
      value={{
        state,
        dispatch,
        increaseCartQuantity,
        decreaseCartQuantity,
        increaseChooseQuantity,
        removeFromCart,
        chooseQuantity
      }}
    >
      {children}
    </ShoppingCart.Provider>
  );
};

export const useShoppingCart = () => {
  // if (useContext(ShoppingCartContext) === undefined) {
  //   throw new Error("useShop must be used within ShopContext");
  // }
  return useContext(ShoppingCart);
};

export default ShoppingCartContext;
