import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loader from '../../../components/Loader';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axios('https://dream-car-server-sajeeb03.vercel.app/categories');
            const data = res.data;
            return data.data
        }
    })

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='mb-12 mt-20 text-center'>
            <h3 className='text-3xl font-bold dark:text-white'>Choose Your Favorite Brand</h3>
            <p className='dark:text-white'>These are cars categories we have.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
                {
                    categories.map(category => <CategoryCard
                        key={category._id}
                        category={category}
                    />)
                }
            </div>
        </div>
    );
};

export default Categories;