import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || {},
        profile: JSON.parse(localStorage.getItem("profile")) || {}
    },
    reducers: {
        logIn: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        logOut: (state) => {
            state.user = {};
            localStorage.setItem("user", JSON.stringify(state.user));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action?.payload;
            localStorage.setItem("profile", JSON.stringify(action?.payload));
        });
        builder.addCase(setProfile.fulfilled, (state, action) => {
            state.profile = action?.payload;
            localStorage.setItem("profile", JSON.stringify(action?.payload));
        });
    }
})

export const getProfile = createAsyncThunk(
    "user/getProfile",
    async (uid) => {
        const docRef = doc(db, "users", uid);
        const res = await getDoc(docRef);
        if (res.exists()) {
            return res.data()
        }
        return {}
    }
);

export const setProfile = createAsyncThunk(
    "user/setProfile",
    async (data) => {
        const value = {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
        }
        try {
            await setDoc(doc(db, "users", data.uid), value);
            toast.success("Update your information successfully!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return value
        } catch (err) {
            toast.error("Update your information failed!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            console.log(err);
        }
    }
);

export const { logIn, logOut } = userSlice.actions;
export default userSlice