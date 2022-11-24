import { createBrowserRouter } from "react-router-dom";
import Layout from '../Pages/Layouts/MainLayout/Layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>
    }
])

export default router;