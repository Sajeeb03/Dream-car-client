import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import useBuyer from '../Hooks/useBuyer';

const BuyerRoute = ({ children }) => {
    const { user, logOut, loading } = useContext(AuthContext);
    const [isBuyer, buyerLoading] = useBuyer(user?.email);
    const location = useLocation();

    if (loading || buyerLoading) {
        return <Loader />
    }

    if (user?.uid && isBuyer) {
        return children;
    }

    else {
        logOut();
        return <Navigate to="/login" state={{ from: location }} replace />
    }
};

export default BuyerRoute;