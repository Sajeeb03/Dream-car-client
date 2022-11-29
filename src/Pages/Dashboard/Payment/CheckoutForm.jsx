import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { logOut } = useContext(AuthContext);
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('');
    const [transactionId, setTransactionId] = useState("");
    const [message, setMessage] = useState("");
    const [clientSecret, setClientSecret] = useState("")
    const { price, name, product, email, _id } = order;
    const total = { total: price }
    useEffect(() => {
        axios.post(`https://dream-car-server-sajeeb03.vercel.app/create-payment-intent`, total, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                setClientSecret(res.data);
            })
            .catch(err => {
                console.log(err.message);
                if (err.response.status) {
                    logOut();
                }
            })
    }, [price])

    const handleSubmit = async e => {
        e.preventDefault()
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error)
            setCardError(error.message)
        } else {
            setCardError("")
        }

        setMessage('');
        setProcessing(true);
        const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );

        if (cardError) {
            setCardError(cardError.message);
            return;
        }


        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // setMessage("Your Payment is successful enjoy!")
            const payment = {
                email,
                name,
                price,
                order: _id,
                transactionId: paymentIntent.id,
                product: product
            }

            const res = await axios.post(`https://dream-car-server-sajeeb03.vercel.app/payments/${_id}`, payment, {
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if (res.data.success) {
                toast.success("Payment successful");
                setMessage("Your payment is successful enjoy.")
                setProcessing(false)
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#424242',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-xs px-3 mt-3 btn-primary' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>

            {
                cardError && <p className="text-error">{cardError}</p>
            }
            {
                message && transactionId && <div>
                    <p>{message}</p>
                    <p>TransactionId: {transactionId}</p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;