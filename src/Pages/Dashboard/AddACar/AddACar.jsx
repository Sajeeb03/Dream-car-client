import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../../../components/Loader';

const AddACar = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axios('http://localhost:5000/categories');
            const data = res.data;
            console.log(data.data)
            return data.data
        }
    })

    if (isLoading) {
        return <Loader />
    }
    const handleAddACar = data => {
        console.log(data);
    }
    return (
        <div className='dark:bg-blue-300 my-4 w-2/3 p-6'>
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
                    {...register("description")}
                    className="input input-bordered w-full" />
                {
                    errors?.description && <p className="text-error">{errors?.description?.message}</p>
                }

                <label className="label">
                    <span className="label-text">Image</span>
                </label>
                <input type="file" {...register("img", { required: "Name field is required" })} className="input input-bordered p-2 w-full" />
                {
                    errors?.img && <p className="text-error">{errors?.img?.message}</p>
                }


                <input type="submit" value="Add Car" className='btn btn-primary w-full mt-6' />
            </form>
        </div>

    );
};

export default AddACar;