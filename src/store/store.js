import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from './Favorite/FavoriteSlice';
import productSlice from "./Product/ProductSlice";
import userSlice from "./User/UserSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        favorite: favoriteSlice.reducer,
        product: productSlice.reducer
    }
})


export default store;