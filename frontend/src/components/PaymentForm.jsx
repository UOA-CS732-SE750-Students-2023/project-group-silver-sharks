import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate, json, useSubmit } from 'react-router-dom';
import './PaymentForm.css';

const PaymentForm = ({ cartContentsData }) => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const submit = useSubmit();

    const calculateTotalPrice = () => {
        return cartContentsData.reduce((total, cartContentsData) => total + cartContentsData.price, 0); 
    };

    const clearCartHandler = () => {
        submit(null, { method: 'DELETE' });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const userResponse = await fetch('http://localhost:3000/account/id/0');

        if (!userResponse.ok) {
            
            if (userResponse.status === 401){
                return redirect("/");
            } 

            // 428 is returned if username is not set
            if (userResponse.status === 428){ 
                return redirect("/username");
            }

            return json({ message: "Could not fetch data from backend."}, { status: 500 });
        } 

        const user = await userResponse.json();

        try {
            // Get each cart item's author
            const cartAuthorIds = cartContentsData.map(cart => cart.author);
            
            for (const cartContent of cartContentsData) {
                
                try {
                    // Create a payment method for each object in cart
                    // It has to be like this since if we use a single payment method for multiple
                    // objects in cart, Stripe will throw customer detachment error.
                    const cardElement = elements.getElement(CardElement);
                    const { error, paymentMethod } = await stripe.createPaymentMethod({
                        type: 'card',
                        card: cardElement,
                    });

                    const authorResponse = (await fetch('http://localhost:3000/account/id/' + cartContent.author));
                    const author = await authorResponse.json();

                    const price = cartContent.price * 100;
                    const response = await axios.post('/create-payment-intent', { 
                        userId: author._id, 
                        amount: price, 
                        connectedAccountId: author.stripeId,
                        paymentMethodId: paymentMethod.id
                    });

                    const clientSecret = response.data;

                    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                        payment_method: paymentMethod.id,
                    });

                    if (paymentResult.error) {
                        // show error on screen
                        console.error('[error]', paymentResult.error);
                        return;
                    } else {
                        if (paymentResult.paymentIntent.status !== 'succeeded') {
                            // show error on screen
                            return;
                        }
                    }
                } catch (error) {
                    console.error('[error]', error);
                    setLoading(false);
                    return;
                }
            }


            // make the request to the backend 
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

            // Clear the cart contents
            clearCartHandler();

            navigate('/store/profile/purchase');
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
                    <div className="p-selling-scroll-container">
                        {cartContentsData.map((product, index) => (
                            <div className="p-asset-item" key={index}>
                                <div className="p-asset-image">
                                    <img src={"http://localhost:3000/uploads/" + product.coverImage} alt={product.name} />
                                </div>
                                <div className="p-asset-name-category">
                                    <h3>{product.name}</h3>
                                    <p>Category: {product.category}</p>
                                    <p>Price: ${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </ul>
                    <h3>Total: ${calculateTotalPrice()}</h3>
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