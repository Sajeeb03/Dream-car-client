import React from 'react';
import camera from "../../../assets/camera.jpg"
const CarPhoto = () => {
    return (
        <div className="hero bg-base-100 dark:bg-blue-300 rounded-lg">
            <div className="hero-content flex-col lg:flex-row gap-8">
                <img src={camera} className="rounded-lg shadow-2xl md:w-1/2" />
                <div className='dark:text-secondary'>
                    <h1 className="text-3xl md:text-5xl font-bold">Car Photography</h1>
                    <p className="py-6 text-lg font-semibold md:w-2/3">If You want sell your car we have our own photographer who is going to help you clicking awesome photos of your car. And You beauty attracts the most! What do you say?</p>
                    <button className="btn btn-primary">Contact Us Now</button>
                </div>
            </div>
        </div>
    );
};

export default CarPhoto;