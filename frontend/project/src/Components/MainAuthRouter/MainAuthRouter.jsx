/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogin, setUserModules, setUserName } from "../../Features/user.slice";

const MainAuthRouter = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setLoggedIn = (status) => {
        dispatch(setUserLogin(status === "success"));
    };

    const setUsername = (username) => {
        dispatch(setUserName({ username }));
    };

    const setUsermodules = (modules) => {
        dispatch(setUserModules({ modules }));
    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/auth", { withCredentials: true })
            .then((response) => {
                const data = response.data;
                setTimeout(() => {
                    setLoading(false);
                }, 400);
                setLoggedIn(data.status);
                setUsername(data.username);
                setUsermodules(data.modules);
            })
            .catch(() => {
                navigate("/login");
                setTimeout(() => {
                    setLoading(false);
                }, 400);
                setLoggedIn(false);
            });
        // setLoading(true);
        //
    }, []);
    return <>{loading ? <>Loading</> : <Outlet />}</>;
};

export default MainAuthRouter;
