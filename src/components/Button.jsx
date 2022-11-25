import React from 'react';

const Button = ({ name }) => {
    return (
        <div>
            <button className='btn btn-primary text-white'>{name}</button>
        </div>
    );
};

export default Button;