import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdmin(user?.email);
    const location = useLocation();
    if (loading || adminLoading) {
        return <Loader />
    }

    if (user?.uid && isAdmin) {
        return children;
    }
    else {
        logOut()
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
};

export default AdminRoute;