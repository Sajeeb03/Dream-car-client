import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
const SocialLogin = ({ setGeneralError }) => {
    const googleProvider = new GoogleAuthProvider();
    const { googleSignIn } = useContext(AuthContext);

    const handleGoogleSignIn = async () => {
        try {
            const res = await googleSignIn(googleProvider);
            // console.log(res.user)
            const user = res.user;

            const userInfo = {
                name: user.displayName,
                email: user.email,
                role: "buyer"
            }
            axios.put(`http://localhost:5000/users?email=${user.email}`, userInfo)
                .then(res => console.log(res.data))
            setGeneralError('')
        } catch (error) {
            setGeneralError(error.message)
        }
    }
    return (
        <div className=''>
            <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary w-full'><FaGoogle className='mr-3' /> Sign in with Google</button>
        </div>
    );
};

export default SocialLogin;