export const initialState = {
  like: JSON.parse(localStorage.getItem("like")) || [],
};

const LikeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_LIKE": {
      const inLike = state.like.some((item) => item.id === payload.id);
      if (inLike) {
        return {
          ...state,
          like: state.like.filter((item) => {
            return item.id !== payload.id;
          }),
        };
      } else {
        return { ...state, like: [...state.like, { ...payload }] };
      }
    }

    case "REMOVE_LIKE": {
      return {
        ...state,
        like: state.like.filter((item) => {
          return item.id !== payload;
        }),
      };
    }
    default:
      return state;
  }
};

export default LikeReducer;
