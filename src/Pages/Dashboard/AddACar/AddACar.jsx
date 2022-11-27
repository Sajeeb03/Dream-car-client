import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../../../components/Loader';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const AddACar = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const currentDate = new Date();
    const date = format(currentDate, "PP");
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axios('http://localhost:5000/categories');
            const data = res.data;
            // console.log(data.data)
            return data.data
        }
    })

    if (isLoading) {
        return <Loader />
    }
    const handleAddACar = data => {
        // console.log(data.img[0]);
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        const imageHostKey = import.meta.env.VITE_IMAGEBB_API;
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        axios.post(url, formData)
            .then(res => {
                // console.log(res.data)
                const imageData = res.data;
                if (imageData.success) {
                    // console.log(imageData.data.url)
                    const product = {

                        name: data.name,
                        seller: user?.displayName,
                        sellerEmail: user?.email,
                        category: data.category,
                        condition: data.condition,
                        yearsOfUse: Number(data.yearsOfUse),
                        sellingPrice: Number(data.sellingPrice),
                        buyingPrice: Number(data.buyingPrice),
                        location: data.location,
                        description: data.description,
                        image: imageData.data.url,
                        postingDate: date
                    }

                    axios.post("http://localhost:5000/cars", product, {
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    })
                        .then(res => {
                            if (res.data.success) {
                                toast.success(res.data.message);
                                navigate('/dashboard/myproducts');
                            }
                        })
                        .catch(err => {
                            if (err.response.status) {
                                logOut();
                            }
                        })
                }
            })
    }
    return (
        <div className='dark:bg-blue-300 my-4 md:w-2/3 p-6'>
            <h2 className="text-2xl font-bold">Add Your Car</h2>
            <form className='' onSubmit={handleSubmit(handleAddACar)}>
                <label className="label">
                    <span className="label-text">Product Name</span>
                </label>
                <input type="text" {...register("name", { required: "Name field is required" })} className="input input-bordered w-full" />
                {
                    errors?.name && <p className="text-error">{errors?.name?.message}</p>
                }
                <label className="label">
                    <span className="label-text">Categories</span>
                </label>
                <select className="select select-bordered w-full" {...register("category")}>
                    {
                        categories.map(category => <option key={category._id} selected={category[0]} value={category.category}>{category.category}</option>)
                    }
                </select>
                <label className="label">
                    <span className="label-text">Cars Condition</span>
                </label>
                <select className="select select-bordered w-full" {...register("condition")}>
                    <option selected>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                </select>
                <label className="label">
                    <span className="label-text">Years of use.</span>
                </label>
                <input type="text" {...register("yearsOfUse", { required: "yearsOfUse field is required" })} className="input input-bordered w-full" />
                {
                    errors?.yearsOfUse && <p className="text-error">{errors?.yearsOfUse?.message}</p>
                }
                <label className="label">
                    <span className="label-text">Selling Price</span>
                </label>
                <input type="text" {...register("sellingPrice", { required: "Name field is required" })} className="input input-bordered w-full" />
                {
                    errors?.sellingPrice && <p className="text-error">{errors?.sellingPrice?.message}</p>
                }
                <label className="label">
                    <span className="label-text">Buying Price</span>
                </label>
                <input type="text"
                    {...register("buyingPrice", { required: "Price field is required" })}
                    className="input input-bordered w-full" />
                {
                    errors?.buyingPrice && <p className="text-error">{errors?.buyingPrice?.message}</p>
                }
                <label className="label">
                    <span className="label-text">Location</span>
                </label>
                <input type="text"
                    {...register("location", { required: "Location field is required" })}
                    className="input input-bordered w-full" />
                {
                    errors?.location && <p className="text-error">{errors?.location?.message}</p>
                }

                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <input type="text"
                    {...register("description", { required: "Description field is required" })}
                    className="input input-bordered w-full" />
                {
                    errors?.description && <p className="text-error">{errors?.description?.message}</p>
                }

                <label className="label">
                    <span className="label-text">Image</span>
                </label>
                <input type="file" {...register("img", { required: "Image field is required" })} className="input input-bordered p-2 w-full" />
                {
                    errors?.img && <p className="text-error">{errors?.img?.message}</p>
                }


                <input type="submit" value="Add Car" className='btn btn-primary w-full mt-6' />
            </form>
        </div>

    );
};

export default AddACar;