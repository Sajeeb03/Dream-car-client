import axios from 'axios';
import React, { useContext } from 'react';
import { FaExclamationCircle, FaRegCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useBuyer from '../../../Hooks/useBuyer';

const CarsCard = ({ car, setModalData }) => {
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email)
    const { name, image, seller, location, buyingPrice, sellingPrice, yearsOfUse, verified, _id } = car;

    const handleReportToAdmin = async car => {
        const { name, _id, seller } = car;
        const item = {
            name,
            seller,
            carId: _id,
        }
        try {
            const res = await axios.post(`https://dream-car-server-sajeeb03.vercel.app/reports`, item, {
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if (res.data.success) {
                toast.error(res.data.message)
            }
        } catch (error) {
            if (error.response.status) {
                logOut();
            }
        }
    }
    return (
        <div className="card card-compact bg-base-100 shadow-xl dark:bg-blue-300">
            <figure><img src={image} className="h-[220px] w-full" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className='font-semibold text-lg'>Location: {location}</p>
                <p className='font-semibold text-lg flex items-center gap-4'>Seller: {seller} {verified && <FaRegCheckCircle className='text-blue-900' />} </p>
                <p className='font-semibold text-lg'>Resale Price: ${sellingPrice}</p>
                <p className='font-semibold text-lg'>Buying Price: ${buyingPrice}</p>
                <p className='font-semibold text-lg'>Years of use: {yearsOfUse} years.</p>
                <div className="card-actions flex justify-between items-center">
                    <p onClick={() => handleReportToAdmin(car)} className='flex gap-2 items-center'><FaExclamationCircle className='h-6 w-6' /> Report To Admin</p>
                    <label htmlFor='bookingModal' onClick={() => setModalData(car)} className="btn btn-primary" disabled={!isBuyer}>Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default CarsCard;