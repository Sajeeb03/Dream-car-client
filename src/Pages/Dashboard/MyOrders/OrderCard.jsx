import React from 'react';

const OrderCard = ({ order }) => {
    const { img, product, price } = order;
    return (
        <div className="card card-compact w-full bg-base-100 dark:bg-blue-300 shadow-xl">
            <figure><img src={img} className="h-[250px] w-full" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{product}</h2>
                <p className='font-semibold'>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Pay</button>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;