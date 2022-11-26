import { createBrowserRouter } from "react-router-dom";
import Cars from "../Pages/Home/Categories/Cars";
import Home from "../Pages/Home/Home/Home";
import Layout from '../Pages/Layouts/MainLayout/Layout';
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><Cars /></PrivateRoute>
            }
        ]
    }
])

export default router;