import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)

const Payment = () => {
    const { id } = useParams();

    const { data: order = [], isLoading } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            try {
                const res = await axios(`https://dream-car-server-sajeeb03.vercel.app/orders/${id}`, {
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                return res.data.data;

            } catch (error) {

            }
        }
    })

    const { product, price } = order;
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='dark:text-secondary'>
            <h3 className="text-3xl font-bold text-center my-4">Payment</h3>
            <div className='w-1/2 border-2 border-primary p-8 dark:bg-blue-300'>
                <p className='text-lg font-semibold mb-3'>Please Pay <span className='text-primary dark:text-secondary'>${price}</span> for <span className='text-primary dark:text-secondary'>${product}</span></p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm order={order} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;