import React, { createContext, useEffect, useState } from 'react';
import Layout from '../../Pages/Layouts/MainLayout/Layout';
export const ToggleContext = createContext();
const ThemeSwitch = ({ children }) => {
    const [theme, setTheme] = useState(`${localStorage.getItem("theme")}`);
console.log(theme)
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        }
        else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const contextData = {
        theme, setTheme
    }

    return (
        <ToggleContext.Provider value={contextData}>
            {children}
        </ToggleContext.Provider>
    );
};

export default ThemeSwitch;