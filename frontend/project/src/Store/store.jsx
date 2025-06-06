import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/user.slice";

const store = configureStore({
    reducer: {
        userstore: userSlice,
    },
});

export default store;
