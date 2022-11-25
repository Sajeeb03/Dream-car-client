import React from 'react';
import { FaGoogle } from "react-icons/fa";
const SocialLogin = () => {
    return (
        <div className=''>
            <button className='btn btn-outline btn-primary w-full'><FaGoogle className='mr-3' /> Sign in with Google</button>
        </div>
    );
};

export default SocialLogin;