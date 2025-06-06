// import { useState } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import store from "./Store/store.jsx";
import { router } from "./router/router.jsx";

import "./App.css";

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </Provider>
    );
}

export default App;
