import React from 'react';

const CarsCard = ({ car }) => {
    const { name, image, seller, location, buyingPrice, sellingPrice, yearsOfUse } = car;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Location: {location}</p>
                <p>Resale Price: ${sellingPrice}</p>
                <p>Buying Price: ${buyingPrice}</p>
                <p>Years of use: {yearsOfUse} years.</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default CarsCard;