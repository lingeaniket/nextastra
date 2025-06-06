import { createBrowserRouter } from "react-router-dom";
import MainAuthRouter from "../Components/MainAuthRouter/MainAuthRouter";
import AuthRouter from "../Components/AuthRouter/AuthRouter";
import Login from "../Components/Auth/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import UserModule from "../Components/Module/UserModule/UserModule";
import HomeModule from "../Components/Module/HomeModule/HomeModule";
import ProductModule from "../Components/Module/ProductModule/ProductModule";
import EmployeeModule from "../Components/Module/EmployeeModule/EmployeeModule";
import User from "../Components/Module/UserModule/User/User";
import RoleModule from "../Components/Module/RoleModule/RoleModule";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainAuthRouter />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/",
                element: <AuthRouter />,
                children: [
                    {
                        path: "/",
                        element: <HomeModule />,
                        children: [
                            {
                                path: "/",
                                element: <Dashboard />,
                            },
                            {
                                path: "/dashboard",
                                element: <Dashboard />,
                            },
                            {
                                path: "/users",
                                element: <UserModule />,
                                // children: [
                                //     {
                                //         path: "/users/:id",
                                //         element: <User />,
                                //     },
                                // ],
                            },
                            {
                                path: "/users/:id",
                                element: <User />,
                            },
                            {
                                path: "/products",
                                element: <ProductModule />,
                            },
                            {
                                path: "/employees",
                                element: <EmployeeModule />,
                            },
                            {
                                path: "/roles",
                                element: <RoleModule />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
