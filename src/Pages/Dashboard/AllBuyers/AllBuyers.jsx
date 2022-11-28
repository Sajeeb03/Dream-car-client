import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Loader from '../../../components/Loader';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const AllBuyers = () => {
    const { logOut } = useContext(AuthContext);
    const [buyerInfo, setBuyerInfo] = useState(null)
    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ["allBuyers"],
        queryFn: async () => {
            try {
                const res = await axios('https://dream-car-server-sajeeb03.vercel.app/users/buyer', {
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

    const handleDelete = buyer => {
        // console.log(id)
        axios.delete(`https://dream-car-server-sajeeb03.vercel.app/users/${buyer._id}`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                if (res.data.success) {
                    toast.error(`${buyer.name} deleted`)
                    refetch();
                }
            }).catch(err => {
                if (err.response.status) {
                    logOut();
                }
            })
    }
    const closeModal = () => {
        setBuyerInfo(null)
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <h3 className="text-3xl font-bold text-center my-3">Buyers List</h3>
            <div className="overflow-x-auto mt-3 px-2">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete Buyer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, i) => <tr className="hover">
                                <th>{i + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td><label
                                    htmlFor="deleteModal"
                                    onClick={() => setBuyerInfo(buyer)}
                                    className='btn btn-xs btn-error'>Delete</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {
                    buyerInfo && <ConfirmationModal
                        title={`Are You Sure You Want to delete ${buyerInfo.name}?`}
                        message={`Remember! You can't undo the operation.`}
                        closeModal={closeModal}
                        modalData={buyerInfo}
                        operation={handleDelete}
                    />
                }
            </div>
        </div>
    );
};

export default AllBuyers;