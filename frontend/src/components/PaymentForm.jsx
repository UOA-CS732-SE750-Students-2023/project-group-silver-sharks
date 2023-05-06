import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate, json, useSubmit } from 'react-router-dom';
import './PaymentForm.css';

const PaymentForm = ({ cartContentsData, connectedAccountId }) => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const submit = useSubmit();

    console.log("++++++++++++++++++++++++++++++++++++++++++")
    console.log(cartContentsData, 15);
    console.log("++++++++++++++++++++++++++++++++++++++++++")

    const calculateTotalPrice = () => {
        return cartContentsData.reduce((total, cartContentsData) => total + cartContentsData.price, 0); // TODO
    };
    //const TotalPriceInCents = (calculateTotalPrice() / 100).toFixed(2)

    const clearCartHandler = () => {
        submit(null, { method: 'DELETE' });
    }

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
            const totalPrice = calculateTotalPrice() * 100;
            console.log("Line 46 Total Price: " + totalPrice);
            const response = await axios.post('/create-payment-intent', { amount: totalPrice, connectedAccountId });

            const clientSecret = response.data;

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (paymentResult.error) {
                console.error('[error]', paymentResult.error);
            } else {
                if (paymentResult.paymentIntent.status === 'succeeded') {
                    console.log('Payment successful');
                    const userResponse = await fetch('http://localhost:3000/account/id/0');

                    if (!userResponse.ok) {
                        
                        if (userResponse.status === 401){
                            console.log("Not Authorized."); 
                            return redirect("/");
                        } 

                        // 428 is returned if username is not set
                        if (userResponse.status === 428){ 
                            return redirect("/username");
                        }

                        return json({ message: "Could not fetch data from backend."}, { status: 500 });
                    } 

                    const user = await userResponse.json();
                    console.log("Line 61 User ID : " + user._id);

                     // call Product/buy endpoint to register the cart contents as being bought by the user
                    const buyProductResponse = await fetch('http://localhost:3000/products/buy?accountId=' + user._id, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(cartContentsData)
                    });
                
                    if (!buyProductResponse.ok){
                        throw json({ message: "Could not successfully buy item."}, { status: 500 });
                    }

                    const newProduct = await buyProductResponse.json()
                    console.log("Line 94: " + newProduct.message);

                    // Clear the cart contents
                    clearCartHandler();

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
            <div className="form-container">
                <div className="cart-container">
                    <h2 className="form-title">Cart Contents</h2>
                    <ul className="cart-list">
                    {cartContentsData.map((product, index) => (
                        <li key={index}>
                        {product.name} - ${product.price}
                        </li>
                    ))}
                    </ul>
                    <h3>Total: ${calculateTotalPrice()}</h3> {/* Display total price here */}
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