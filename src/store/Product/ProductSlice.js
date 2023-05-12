import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const limitNumber = process.env.REACT_APP_PRODUCT_LIMIT || 6

const productSlice = createSlice({
    name: "product",
    initialState: {
        productList: [],
        categoryList: [],
        setCategory: 0,
        totalProductPage: 0
    },
    reducers: {
        chooseCategory(state, action) {
            state.setCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductList.fulfilled, (state, action) => {
            state.productList = action.payload;
            state.totalProductPage = Math.ceil(state.productList.length / limitNumber);
        });
        builder.addCase(getCategoryList.fulfilled, (state, action) => {
            state.categoryList = action.payload;
        })
    }
});
export const getProductList = createAsyncThunk(
    "products/getProductList",
    async (args) => {
        var url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=200`;
        const api = await fetch(url);
        const data = await api.json();
        return (args.value.trim() === "" ? data : data.filter(item => item.title.toLowerCase().includes(args.value.toLowerCase()) === true));
       }
);


export const getCategoryList = createAsyncThunk(
    "products/getCategoryList",
    async () => {
        const api = await fetch(`https://api.escuelajs.co/api/v1/categories/`);
        const data = await api.json();
        return data.slice(0, 5);
    }
);

export const { chooseCategory } = productSlice.actions;
export default productSlice;
