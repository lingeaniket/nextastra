import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin, setUserModules, setUserName } from "../../Features/user.slice";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLoggedIn = useSelector((state) => state.userstore.userloggedIn);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get("email");
        const password = formData.get("password");

        axios
            .post("http://localhost:3000/api/auth/login", { email, password }, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                dispatch(setUserLogin(true));
                dispatch(setUserName(response.data));
                dispatch(setUserModules(response.data));
                navigate("/");
                console.log("login called");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {!userLoggedIn ? (
                <section className='container'>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "100dvh" }}>
                        <div style={{ padding: "15px", border: "1px solid black", borderRadius: "4px" }}>
                            <div>
                                <h1 style={{ textAlign: "center" }}>Login</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label className='form-label' htmlFor='email'>
                                        Email:
                                    </label>
                                    <input required className='form-control' type='text' name='email' id='email' />
                                </div>
                                <div>
                                    <label className='form-label' htmlFor='password'>
                                        Password
                                    </label>
                                    <input required className='form-control' type='password' name='password' id='password' />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <button type='submit' className='btn btn-primary mt-3'>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            ) : (
                <Navigate to='/' />
            )}
        </>
    );
};

export default Login;
