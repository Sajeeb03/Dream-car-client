import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import car from "../../../assets/login/car.gif"
import SocialLogin from '../SocialLogin/SocialLogin';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [generalError, setGeneralError] = useState('')
    const handleLogin = data => {
        console.log(data)
    }
    return (
        <div className="hero my-12">
            <div className="hero-content">
                <div className="w-1/2">
                    <img className='rounded-lg' src={car} alt="" />
                </div>
                <div className="card flex-shrink-0 w-1/2 shadow-2xl bg-base-100 p-12">
                    <div>
                        <h2 className="text-4xl uppercase text-center font-bold text-primary">Sign In</h2>
                    </div>

                    <form onSubmit={handleSubmit(handleLogin)}>

                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>

                        <input type="email"
                            {...register("email", { required: "Email address is required" })}
                            className="input input-bordered w-full" />
                        {errors.email && <p className='text-orange-700'>{errors.email.message}</p>}

                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password",
                            { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters." } })}
                            className="input input-bordered w-full" />
                        {errors?.password && <p className='text-orange-700'>{errors?.password?.message}</p>}
                        <label htmlFor="my-modal-6" className="label">
                            <span className="label-text">Forgot password?</span>
                        </label>
                        <input type="submit" value="Sign In" className='btn btn-primary w-full mt-3' />
                    </form>
                    {
                        generalError && <p className="text-error">{generalError}</p>
                    }
                    <p className='text-center mt-2'>New to Dream Car? <Link to="/register" className='text-blue-400'>Create an account</Link></p>
                    <div className="divider divider-vertical">OR</div>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;