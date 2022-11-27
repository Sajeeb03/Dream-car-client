import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import Loader from '../../../components/Loader';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const MyProducts = () => {
    const { user, logOut } = useContext(AuthContext);
    const { data: cars = [], isLoading } = useQuery({
        queryKey: ["cars", user?.email],
        queryFn: async () => {
            try {
                const res = await axios(`http://localhost:5000/cars?email=${user?.email}`, {
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                return res.data.data;
            } catch (error) {
                // console.log('errrorrrrrrrrr', error.response.status)
                if (error.response.status) {
                    logOut();
                }
                // if (error.AxiosError)
            }

        }
    })

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            my products
            {cars.map(car => <p>{car.name}</p>)}
        </div>
    );
};

export default MyProducts;