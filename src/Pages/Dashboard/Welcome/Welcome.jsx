import React from 'react';
import useScrollToTop from '../../../Hooks/useScrollToTop';
import useTitle from '../../../Hooks/useTitle';

const Welcome = () => {
    useScrollToTop();
    useTitle("Dream Car", "Dashboard")
    return (
        <div className='flex flex-col items-center justify-center mt-12'>
            <h3 className="md:text-3xl font-bold dark:text-white">Welcome to the Dashboard</h3>
            <h2 className="md:text-3=2xl font-bold dark:text-white md:hidden">Click On the Home Icon to Open the Drawer.</h2>
        </div>
    );
};

export default Welcome;