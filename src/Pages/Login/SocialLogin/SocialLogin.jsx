import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useToken from '../../../Hooks/useToken';
const SocialLogin = ({ setGeneralError }) => {
    const googleProvider = new GoogleAuthProvider();
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [token] = useToken(userEmail)
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    if (token) {
        navigate(from, { replace: true })
    }
    const handleGoogleSignIn = async () => {
        try {
            const res = await googleSignIn(googleProvider);
            // console.log(res.user)
            setUserEmail(res.user.email)
            const user = res.user;

            const userInfo = {
                name: user.displayName,
                email: user.email,
                role: "buyer"
            }
            axios.put(`https://dream-car-server-sajeeb03.vercel.app/users?email=${user.email}`, userInfo)
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