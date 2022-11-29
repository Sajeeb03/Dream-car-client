import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({ order }) => {
    const { img, product, price, paid, _id } = order;
    return (
        <div className="card card-compact w-full bg-base-100 dark:bg-blue-300 shadow-xl">
            <figure><img src={img} className="h-[250px] w-full" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{product}</h2>
                <p className='font-semibold'>Price: ${price}</p>
                <div className="card-actions justify-end">
                    {
                        price && paid ? <p className='text-primary'>Paid</p> : <Link to={`/dashboard/payment/${_id}`}>
                            <button className="btn btn-primary">Pay</button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderCard;