import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userid: null,
        username: null,
        userloggedIn: false,
        userrole: "User",
        usermodules: "",
    },
    reducers: {
        setUserid: (state, action) => {
            state.userid = action.payload.userid;
        },
        setUserName: (state, action) => {
            state.username = action.payload.username;
        },

        setUserLogin: (state, action) => {
            state.userloggedIn = action.payload;
        },
        setUserRole: (state, action) => {
            state.userrole = action.payload;
        },
        setUserModules: (state, action) => {
            state.usermodules = action.payload.modules;
        },
    },
});

export const { setUserid, setUserLogin, setUserName, setUserRole, setUserModules } = userSlice.actions;

export default userSlice.reducer;
