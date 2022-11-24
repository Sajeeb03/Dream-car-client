import React, { useContext } from 'react';
import { ToggleContext } from '../../../Contexts/ThemeSwitch/ThemeSwitch';
import Header from '../../Shared/Header/Header';


const Layout = () => {
    const { theme, setTheme } = useContext(ToggleContext);
    const toggleTheme = () => {
        theme === "dark" ? setTheme("") : setTheme("dark");
    }
    return (

        <div>
            <Header></Header>
            <hr />
            <h1 className=''>Layouts</h1>
            <button onClick={toggleTheme} className="btn btn-secondary">Button</button>
        </div>

    );
};

export default Layout;