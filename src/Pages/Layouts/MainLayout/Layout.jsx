import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';

import Header from '../../Shared/Header/Header';


const Layout = () => {

    return (

        <div>
            <Header></Header>
            <hr />
            <Outlet />
            <Footer></Footer>

        </div>

    );
};

export default Layout;