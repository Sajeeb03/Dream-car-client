import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import CarsCard from './CarsCard';

const Cars = () => {
    const route = useParams();
    const { logOut } = useContext(AuthContext)
    const categoryName = route.id;
    const { data: cars = [], isLoading } = useQuery({
        queryKey: ['cars', categoryName],
        queryFn: async () => {
            try {
                const res = await axios(`http://localhost:5000/cars/${categoryName}`, {
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                return res.data.data;
            } catch (error) {
                if (error.response.status) {
                    logOut();
                }
            }
        }
    });

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <h3 className='text-center mt-5 mb-2 text-3xl font-bold dark:text-white'>Available <span className='text-primary dark:text-info'>{categoryName}</span> Cars!</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                cars.map(car => <CarsCard
                    key={car._id}
                    car={car}
                />)
            }
            </div>
        </div>
    );
};

export default Cars;