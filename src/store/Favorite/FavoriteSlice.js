import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const limitNumber = process.env.REACT_APP_FAVORITE_LIMIT || 8;

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: JSON.parse(localStorage.getItem("favoriteList")) || [],
    totalFavoritePage: Math.ceil((JSON.parse(localStorage.getItem("favoriteList")) || 0).length / limitNumber),
  },
  reducers: {
    addFavorite(state, action) {
      const exist = state.favorite.some((item) => item.id === action.payload.id);
      if (exist) {
        state.favorite = state.favorite.filter(item => item.id !== action.payload.id);
        toast.warning("Remove from favorite list successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      }
      else {
        state.favorite.push(action.payload);
        toast.success("Add to favorite list successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      }
      state.totalFavoritePage = Math.ceil(state.favorite.length / limitNumber);
      localStorage.setItem("favoriteList", JSON.stringify(state.favorite));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteFilter.fulfilled, (state, action) => {
      state.favorite = action.payload;
      state.totalFavoritePage =  Math.ceil(state.favorite.length / limitNumber);
    });
  }
});

export const getFavoriteFilter = createAsyncThunk(
  "favorite/getFavoriteFilter",
  async (dataFilter) => {
    const favorites = JSON.parse(localStorage.getItem("favoriteList"));
    const dataSearch = dataFilter.toLowerCase();
    const response = favorites.filter(item => item.title.toLowerCase().includes(dataSearch) === true);
    return response;
  }
);

export const { addFavorite } = favoriteSlice.actions;
export default favoriteSlice;
