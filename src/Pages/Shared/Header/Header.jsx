import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import { ToggleContext } from '../../../Contexts/ThemeSwitch/ThemeSwitch';
import lightLogo from '../../../assets/lightLogo.png'
import darkLogo from '../../../assets/darkLogo.png'
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const Header = () => {
    const { theme, setTheme } = useContext(ToggleContext);
    const { user, logOut } = useContext(AuthContext);
    const toggleTheme = () => {
        theme === "dark" ? setTheme("") : setTheme("dark");
    }

    const handleSignOut = async () => {
        try {
            const res = await logOut();
        } catch (error) {
            console.error(error)
        }
    }
    const menuItems = <>
        <div className='mr-3 ml-4 md:ml-0 flex gap-3 items-center'>
            <label className='dark:md:text-white font-serif'>{theme === "dark" ? "Light" : "Dark"}</label>
            <ReactSwitch checked={theme === "dark"} onChange={toggleTheme} />
        </div>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blogs'>Blogs</Link></li>
        {
            !user?.uid ? <li><Link to='/login'>Sign In</Link></li> :
                <>
                    <li><Link to='/dashboard/'>Dashboard</Link></li>
                    <li><Link to='/login' onClick={handleSignOut}>Sign Out</Link></li>
                </>
        }
    </>
    return (
        <div className="navbar bg-base-100 dark:bg-primary shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to={`/`} className="w-64 -m-8"><img src={theme === "dark" ? darkLogo : lightLogo} alt="main logo" /></Link>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal p-0 hidden lg:flex dark:text-white">
                    {menuItems}
                </ul>
            </div>
            <label tabIndex={0} htmlFor="dashboardDrawer" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Header;