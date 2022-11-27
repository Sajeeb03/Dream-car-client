import { createBrowserRouter } from "react-router-dom";
import AddACar from "../Pages/Dashboard/AddACar/AddACar";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import Cars from "../Pages/Home/Categories/Cars";
import Home from "../Pages/Home/Home/Home";
import DashboardLayout from "../Pages/Layouts/DashboardLayout/DashboardLayout";
import Layout from '../Pages/Layouts/MainLayout/Layout';
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

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
    },
    {
        path: "/dashboard/",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "/dashboard/addacar",
                element: <SellerRoute><AddACar /></SellerRoute>
            },
            {
                path: "/dashboard/myproducts",
                element: <SellerRoute><MyProducts /></SellerRoute>
            },
            {
                path: "/dashboard/orders",
                element: <MyOrders />
            },
            {
                path: "/dashboard/buyers",
                element: <AdminRoute><AllBuyers /></AdminRoute>
            },
            {
                path: "/dashboard/sellers",
                element: <AdminRoute><AllSellers /></AdminRoute>
            }
        ]

    }
])

export default router;