import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Loader from '../../../components/Loader';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const MyProducts = () => {
    const { user, logOut } = useContext(AuthContext);
    const [carInfo, setCarInfo] = useState(null);
    const { data: cars = [], isLoading, refetch } = useQuery({
        queryKey: ["cars", user?.email],
        queryFn: async () => {
            try {
                const res = await axios(`http://localhost:5000/cars?email=${user?.email}`, {
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                return res.data.data;
            } catch (error) {
                if (error.response.status) {
                    logOut();
                }
            }

        }
    })

    const closeModal = () => {
        setCarInfo(null)
    }

    const handleDelete = async car => {
        try {
            const res = await axios.delete(`http://localhost:5000/cars/${car._id}`, {
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = res.data;
            if (data.success) {
                toast.success(`${car.name} deleted`);
                refetch();
            }
        } catch (error) {
            if (error.response.status) {
                logOut();
            }
        }
    }

    const handleAdvertise = (car) => {
        const { name, image, _id } = car;
        const advertiseItem = {
            name,
            image,
            carId: _id,
        }

        axios.post('http://localhost:5000/advertise', advertiseItem, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data.success) {
                    toast.success("Item advertised")
                    refetch();
                }
            })
            .catch(error => {
                if (error.response.status) {
                    logOut();
                }
            })
    }


    //update status available to sold
    const handleAvailableProduct = async (id) => {
        const updateData = { sold: true }
        try {
            const res = await axios.put(`http://localhost:5000/cars/${id}`, updateData, {
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = res.data;
            if (data.success) {
                toast.success("Sell status updated")
                refetch();
            }
        } catch (error) {
            // console.log("inside error", error)
            if (error.response.status) {
                logOut();
            }
        }
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <h3 className="text-3xl font-bold my-3">My Products</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Car Name</th>
                            <th>Sale Status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cars.map((car, i) => <tr key={car._id} className="hover">
                                <th>{i + 1}</th>
                                <td>{car.name}</td>
                                <td>{car.sold ? <btn className="btn btn-xs btn-primary disabled">Sold</btn> : <btn onClick={() => handleAvailableProduct(car._id)} className="btn btn-xs btn-primary">Available</btn>}</td>
                                <td>{car.sold ? <btn className="btn btn-xs btn-primary disabled">Unavailable</btn> : <btn className="btn btn-xs btn-primary" disabled={car.advertised} onClick={() => handleAdvertise(car)}>{car.advertised ? "Advertised" : "Advertise"}</btn>}</td>
                                <td><label htmlFor='deleteModal' onClick={() => setCarInfo(car)} className='btn btn-xs btn-error'>Delete</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                carInfo && <ConfirmationModal
                    title={`Delete Your Product ${carInfo.name}`}
                    message={`Remember The action cannot be undone!`}
                    modalData={carInfo}
                    closeModal={closeModal}
                    operation={handleDelete}
                />
            }
        </div>
    );
};

export default MyProducts;