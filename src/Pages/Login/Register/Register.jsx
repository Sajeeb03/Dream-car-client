import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import car from "../../../assets/login/car.gif"
import { Link } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [generalError, setGeneralError] = useState('')
    const handleRegistration = data => {
        console.log(data)
    }
    return (
        <div className="hero my-2 md:my-12">
            <div className="hero-content">
                <div className="w-1/2 hidden md:block">
                    <img className='rounded-lg' src={car} alt="" />
                </div>
                <div className="card flex-shrink-0 md:w-1/2 shadow-2xl bg-base-100 p-8">
                    <div>
                        <h2 className="text-4xl uppercase text-center font-bold text-primary">Sign Up</h2>
                    </div>

                    <form onSubmit={handleSubmit(handleRegistration)}>

                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>

                        <input type="text"
                            {...register("name", { required: "Name address is required" })}
                            className="input input-bordered w-full" />

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
                        <label className="label">
                            <span className="label-text">Select Your Role</span>
                        </label>
                        <select className="select select-bordered w-full" {...register("role")}>
                            <option>Buyer</option>
                            <option>Seller</option>
                        </select>
                        <input type="submit" value="Sign Up" className='btn btn-primary w-full mt-3' />
                    </form>
                    {
                        generalError && <p className="text-error text-center">{generalError}</p>
                    }
                    <p className='text-center mt-2'>Already have an account? <Link to="/login" className='text-blue-400'>Sing in now</Link></p>
                    <div className="divider divider-vertical">OR</div>
                    <SocialLogin setGeneralError={setGeneralError} />
                </div>
            </div>
        </div>
    );
};

export default Register;