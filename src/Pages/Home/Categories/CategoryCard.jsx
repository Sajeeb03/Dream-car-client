import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

const CategoryCard = ({ category }) => {
    const { category: name, img, _id } = category;
    return (
        <div className="card bg-base-100 dark:bg-blue-300 shadow-xl">
            <figure><img src={img} className="h-[270px] w-full" alt="cars" /></figure>
            <div className="card-body">
                <h2 className="card-title text-4xl dark:text-secondary">
                    {name}
                </h2>
                <p className='text-left dark:text-secondary font-semibold'>We have more used cars of this company. Click the button to explore more.</p>
                <div className='flex justify-end'>
                    <Link to={`category/${_id}`}>
                        <Button name={'Explore Now'}></Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;