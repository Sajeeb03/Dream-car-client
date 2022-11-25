import React from 'react';

const Loader = () => {
    return (
        <div className='flex justify-center h-screen items-center'>
            <p className='border-4 border-dashed border-primary dark:border-info rounded-full h-12 w-12 animate-spin'></p>
        </div>
    );
};

export default Loader;