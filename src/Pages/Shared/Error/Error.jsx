import React from 'react';
import { Link } from 'react-router-dom';
import err from "../../../assets/error.jpg"
const Error = () => {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <img src={err} alt="" />
            <Link to="/">
                <button className='btn btn-primary mt-2'>Back To Home</button>
            </Link>
        </div>
    );
};

export default Error;