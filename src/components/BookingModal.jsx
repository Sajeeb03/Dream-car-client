import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';

const BookingModal = ({ modalData, setModalData }) => {
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const handleOrder = (e) => {
        e.preventDefault();
        const form = e.target;
        const orderedProduct = {
            name: form.name.value,
            email: form.email.value,
            product: form.product.value,
            productId: modalData._id,
            img: modalData.image,
            price: form.price.value,
            phone: form.phone.value,
            location: form.location.value,
        }

        axios.post("https://dream-car-server-sajeeb03.vercel.app/orders", orderedProduct, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then((result) => {
                if (result.data.success) {
                    toast.success("Order Placed")
                    setModalData(null)
                    navigate('/dashboard/orders')
                }
            }).catch((err) => {
                if (err.response.status) {
                    logOut();
                }
            });


    }
    return (
        <div>
            <input type="checkbox" id="bookingModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form onSubmit={handleOrder}>
                        <label className="label label-text">
                            Name
                        </label>
                        <input type="text" placeholder="Type here" name="name" value={user?.displayName} disabled className="input input-bordered w-full" />
                        <label className="label label-text">
                            Email
                        </label>
                        <input type="text" name="email" placeholder="Type here" value={user?.email} disabled className="input input-bordered w-full" />
                        <label className="label label-text">
                            Product Name
                        </label>
                        <input type="text" name="product" placeholder="Type here" defaultValue={modalData.name} disabled className="input input-bordered w-full" />
                        <label className="label label-text">
                            Price
                        </label>
                        <input type="text" placeholder="Type here" name='price'
                            defaultValue={modalData.sellingPrice} disabled className="input input-bordered w-full" />
                        <label className="label label-text">
                            Your Phone Number
                        </label>
                        <input type="text" name="phone" placeholder="Type here" className="input input-bordered w-full" />
                        <label className="label label-text">
                            Meeting Location
                        </label>
                        <input type="text" name="location" placeholder="Type here" className="input input-bordered w-full" />
                        <input type="submit" className='btn btn-primary w-full mt-3' value="Place Order" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;