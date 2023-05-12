export const initialState = {
  totalMoney: JSON.parse(localStorage.getItem("total-money")) || 0,
  cart: JSON.parse(localStorage.getItem("shopping-cart")) || [],
};

const ShoppingCartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "INCREASE_QUANTITY": {
      const inCart = state.cart.some((item) => item.id === payload.id);
      if (inCart) {
        const updatedCart = state.cart.map((item) => {
          if (item.id === payload.id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, { ...payload, qty: 1 }] };
      }
    }
    case "DECREASE_QUANTITY": {
        const updatedCart = state.cart.map((item) => {
          if (item.id === payload.id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
        return { ...state, cart: updatedCart };
      }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item) => {
          return item.id !== payload;
        }),
      };
    }
    case "INCREASE_CHOOSE_QUANTITY": {
      const inCart = state.cart.some((item) => item.id === payload.item.id);
      if (inCart) {
        const updatedCart = state.cart.map((item) => {
          if (item.id === payload.item.id) {
            return { ...item, qty: item.qty + payload.quantity };
          } else {
            return item;
          }
        });
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, { ...payload.item, qty: 1 }] };
      }
    }
    case "CHOOSE_QUANTITY": {
      const updatedCart = state.cart.map((item) => {
        if (item.id === payload.id) {
          return { ...item, qty: payload.quantity };
        } else {
          return item;
        }
      });
      return { ...state, cart: updatedCart };
    }
    case "GET_TOTAL_MONEY": {
      let { totalMoney } = state.cart.reduce(
        (accum, curVal) => {
          let { price, qty } = curVal;
  
          let updatedTotalMoney = price * qty;
          accum.totalMoney += updatedTotalMoney;
          return accum;
        },
        {
          totalMoney: 0,
        }
      );
      return { ...state, totalMoney };
    }
    default:
      return state;
  }
};

export default ShoppingCartReducer;
