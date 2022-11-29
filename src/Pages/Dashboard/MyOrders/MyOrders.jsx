import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import Loader from '../../../components/Loader';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import OrderCard from './OrderCard';


const MyOrders = () => {
    const { user, logOut } = useContext(AuthContext);
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            try {
                const res = await axios(`https://dream-car-server-sajeeb03.vercel.app/orders?email=${user?.email}`, {
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                return res.data.data;
            } catch (error) {
                if (error?.response?.status) {
                    logOut();
                }
            }
        }
    })

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <h3 className="text-3xl font-bold text-center my-4">My Orders</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
                {
                    orders.map(order => <OrderCard
                        key={order._id}
                        order={order}
                    />)
                }
            </div>
        </div>
    );
};

export default MyOrders;