import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css';

const PaymentForm = ({ cartContentsData }) => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    console.log("++++++++++++++++++++++++++++++++++++++++++")
    console.log(cartContentsData, 15);
    console.log("++++++++++++++++++++++++++++++++++++++++++")

    const calculateTotalPrice = () => {
        return cartContentsData.reduce((total, product) => total + product.price, 0);
    };
    //const price = 1000; // Add the price here, in cents

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('[error]', error);
                setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/create-payment-intent', { amount: price });

            const clientSecret = response.data;

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (paymentResult.error) {
                console.error('[error]', paymentResult.error);
            } else {
                if (paymentResult.paymentIntent.status === 'succeeded') {
                    console.log('Payment successful');
                    navigate('/store/profile/purchase');
                }
            }
        } catch (err) {
            console.error(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="payment-form-container">
            <div className="=form-container">
                <div className="cart-container">
                    <h2 className="form-title">Cart Contents</h2>
                    <ul className="cart-list">
                    {cartContentsData.map((product, index) => (
                        <li key={index}>
                        {product.name} - ${(product.price / 100).toFixed(2)}
                        </li>
                    ))}
                    </ul>
                    <h3>Total: ${(calculateTotalPrice() / 100).toFixed(2)}</h3> {/* Display total price here */}
                </div>
                <div className="payment-container">
                    <h2 className="form-title">Complete your payment</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="card-element-container">
                        <CardElement />
                        </div>
                        <button type="submit" className="submit-btn" disabled={!stripe || loading}>
                        {loading ? 'Processing...' : 'Pay'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      );
};

export default PaymentForm;