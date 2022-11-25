import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../Shared/Header/Header';


const Layout = () => {

    return (

        <div>
            <Header></Header>
            <hr />
            <Outlet />

        </div>

    );
};

export default Layout;