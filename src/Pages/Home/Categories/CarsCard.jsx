import React from 'react';

const CarsCard = ({ car }) => {
    const { name, image, seller, location, buyingPrice, sellingPrice, yearsOfUse } = car;
    return (
        <div className="card card-compact bg-base-100 shadow-xl dark:bg-blue-300">
            <figure><img src={image} className="h-[220px] w-full" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className='font-semibold text-lg'>Location: {location}</p>
                <p className='font-semibold text-lg'>Seller: {seller}</p>
                <p className='font-semibold text-lg'>Resale Price: ${sellingPrice}</p>
                <p className='font-semibold text-lg'>Buying Price: ${buyingPrice}</p>
                <p className='font-semibold text-lg'>Years of use: {yearsOfUse} years.</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default CarsCard;