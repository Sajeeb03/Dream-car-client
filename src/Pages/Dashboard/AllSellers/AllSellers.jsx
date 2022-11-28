import { useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Loader from '../../../components/Loader';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const AllSellers = () => {
    const { logOut } = useContext(AuthContext);
    const [sellerInfo, setSellerInfo] = useState(null);
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            try {
                const res = await axios('https://dream-car-server-sajeeb03.vercel.app/users/seller', {
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                return res.data.data;
            } catch (error) {
                if (error.response.statue) {
                    logOut();
                }
            }
        }
    })

    const closeModal = () => {
        setSellerInfo(null)
    }

    const handleDelete = seller => {
        axios.delete(`https://dream-car-server-sajeeb03.vercel.app/users/${seller._id}`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                if (res.data.success) {
                    toast.error(`${seller.name} deleted`)
                    refetch();
                }
            }).catch(err => {
                console.log('inside error', err)
                if (err?.response?.status) {
                    logOut();
                }
            })
    }

    const handleVerify = async id => {
        // console.log(id)
        const update = { verified: true }
        try {
            const res = await axios.put(`https://dream-car-server-sajeeb03.vercel.app/seller/${id}`, update, {
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                refetch();
            }
        } catch (error) {
            // console.log(error)
            if (error?.response?.status) {
                logOut();
            }
        }

    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <h3 className="text-3xl font-bold text-center my-3">Sellers List</h3>
            <div className="overflow-x-auto px-3">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verify Seller</th>
                            <th>Delete Seller</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) =>
                                <tr key={seller._id} className="hover">
                                    <th>{i + 1}</th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td>
                                        {seller.verified ? <FaRegCheckCircle className='text-blue-900' /> : <button onClick={() => handleVerify(seller._id)} className='btn btn-xs btn-info'>verify</button>}
                                    </td>
                                    <td><label onClick={() => setSellerInfo(seller)} htmlFor='deleteModal' className='btn btn-xs btn-error'>Delete</label></td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                sellerInfo && <ConfirmationModal
                    title={`Are you sure you want to delete ${sellerInfo.name}`}
                    message={`Remember! You can't undo the operation.`}
                    closeModal={closeModal}
                    modalData={sellerInfo}
                    operation={handleDelete}
                />
            }
        </div>
    );
};

export default AllSellers;