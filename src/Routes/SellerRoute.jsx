import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import useSeller from '../Hooks/useSeller';

const SellerRoute = ({ children }) => {
    const { user, logOut, loading } = useContext(AuthContext);
    const [isSeller, sellerLoading] = useSeller(user?.email);
    const location = useLocation();
    if (loading || sellerLoading) {
        return <Loader />
    }
    if (user?.uid && isSeller) {
        return children;
    }
    else {
        logOut();
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }

};

export default SellerRoute;