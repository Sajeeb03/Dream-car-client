import React, { useContext } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';
import useSeller from '../../../Hooks/useSeller';
import Header from '../../Shared/Header/Header';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    return (
        <div>
            <Header />
            <hr />
            <div className="drawer h-[200vh] drawer-mobile shadow-lg">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 md:bg-neutral dark:text-white text-md font-semibold text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><p className='font-semibold text-xl'>
                            <FaHome></FaHome> Dashboard
                        </p></li>
                        <li><Link to='/dashboard/orders'>My Orders</Link></li>
                        {isSeller && <li><Link to='/dashboard/addacar'>Add A Car</Link></li>}
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/buyers'>All Buyers</Link></li>
                                <li><Link to='/dashboard/sellers'>All Sellers</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;