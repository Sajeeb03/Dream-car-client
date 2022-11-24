import React, { createContext, useEffect, useState } from 'react';
import Layout from '../../Pages/Layouts/MainLayout/Layout';
export const ToggleContext = createContext();
const ThemeSwitch = ({ children }) => {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        }
        else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const authInfo = {
        theme, setTheme
    }

    return (
        <ToggleContext.Provider value={authInfo}>
            {children}
        </ToggleContext.Provider>
    );
};

export default ThemeSwitch;