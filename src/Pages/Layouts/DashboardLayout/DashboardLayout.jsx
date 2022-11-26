import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../../Shared/Header/Header';

const DashboardLayout = () => {
    return (
        <div>
            <Header />
            <hr />
            <div className="drawer h-auto drawer-mobile shadow-lg">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 dark:text-white text-md font-semibold text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to='/dashboard/orders'>My Orders</Link></li>
                        <li><Link to='/dashboard/addacar'>Add A Car</Link></li>
                        <li><Link to='/dashboard/buyers'>All Buyers</Link></li>
                        <li><Link to='/dashboard/sellers'>All Sellers</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;