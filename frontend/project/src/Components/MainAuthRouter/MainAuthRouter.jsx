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
                setLoggedIn(data.status);
                setUsername(data.username);
                setUsermodules(data.modules);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })
            .catch(() => {
                console.log("login");
                navigate("/login");
                setTimeout(() => {
                    setLoading(false);
                }, 500);
                setLoggedIn(false);
            });
    }, []);
    return (
        <>
            {loading ? (
                <div style={{ width: "100%", height: "100dvh" }} className='d-flex align-items-center justify-content-center'>
                    <div class='spinner-border text-warning' role='status'>
                        <span class='visually-hidden'>Loading...</span>
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default MainAuthRouter;
