import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRouter = () => {
    const userLoggedIn = useSelector((state) => state.userstore.userloggedIn);

    return <>{userLoggedIn ? <Outlet /> : <Navigate to='/login' />}</>;
};

export default AuthRouter;
