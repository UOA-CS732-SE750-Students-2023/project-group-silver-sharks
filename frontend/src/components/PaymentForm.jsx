import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css';

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const price = 1000; // Add the price here, in cents

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
        const response = await axios.post('/stripe/create-payment-intent', { amount: price });

        const clientSecret = response.data;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (paymentResult.error) {
            console.error('[error]', paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                console.log('Payment successful');
                navigate('/'); //TODO navigate to purchased items page
            }
        }
    } catch (err) {
        console.error(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="payment-form-container">
        <div className="form-container">
            <h2 className="form-title">Complete your payment</h2>
            <p>Total: ${(price / 100).toFixed(2)}</p> {/* Add this line to display the price */}
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
    );
};

export default PaymentForm;

