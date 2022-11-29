import React, { useContext } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';
import useBuyer from '../../../Hooks/useBuyer';
import useSeller from '../../../Hooks/useSeller';
import Header from '../../Shared/Header/Header';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email)
    return (
        <div>
            <Header>{true}</Header>
            <hr />
            <div className="drawer h-[200vh] drawer-mobile shadow-lg">
                <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <Outlet />

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 md:bg-neutral dark:text-white text-md font-semibold text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to='/dashboard/'><p className='font-semibold text-xl flex gap-2 items-center'><FaHome></FaHome> Dashboard</p></Link></li>
                        {
                            isBuyer && <>
                                <li><Link to='/dashboard/orders'>My Orders</Link></li>
                            </>
                        }
                        {isSeller && <>
                            <li><Link to='/dashboard/addacar'>Add A Car</Link></li>
                            <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                        </>}
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/buyers'>All Buyers</Link></li>
                                <li><Link to='/dashboard/sellers'>All Sellers</Link></li>
                                <li><Link to='/dashboard/reports'>Reports</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;