import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Link, Outlet } from "react-router-dom";
import { setUserLogin } from "../../../Features/user.slice";

const HomeModule = () => {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.userstore.username);
    const usermodules = useSelector((state) => state.userstore.usermodules);

    const handleLogout = () => {
        axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true }).then(() => {
            dispatch(setUserLogin(false));
        });
    };
    return (
        <>
            <header className='header'>
                <div>
                    <div className='container'>
                        <div
                            style={{
                                padding: "10px 0",
                            }}
                        >
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>Dashboard</div>
                                <div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='d-flex align-items-center h-100'>
                                                <div>{username}</div>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <button className='btn btn-primary' onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <aside className='sidebar'>
                <ul>
                    {usermodules.includes("dashboard") && (
                        <li>
                            <Link to='/'>Dashboard</Link>
                        </li>
                    )}
                    {usermodules.includes("user") && (
                        <li>
                            <Link to='/users'>Users</Link>
                        </li>
                    )}
                    {usermodules.includes("product") && (
                        <li>
                            <Link to='/products'>Products</Link>
                        </li>
                    )}
                    {usermodules.includes("employee") && (
                        <li>
                            <Link to='/employees'>Employees</Link>
                        </li>
                    )}
                    {usermodules.includes("role") && (
                        <li>
                            <Link to='/roles'>Roles</Link>
                        </li>
                    )}
                </ul>
            </aside>
            <main>
                <section className='container'>
                    <Outlet />
                </section>
            </main>
        </>
    );
};

export default HomeModule;
