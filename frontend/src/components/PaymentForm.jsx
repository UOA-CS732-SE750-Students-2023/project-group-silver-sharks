import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css';

//const PaymentForm = ({ cartContentsData }) => { UNCOMMENT THIS LINE AFTER CART LOADER IS DONE AND REPLACE DUMMY_DATA
const PaymentForm = () => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const DUMMY_DATA = [
        {   
            pid: 1,
            aid: 2,
            name: 'goku',
            price:8000,
            sold:414,
            like:4.8,
            category:'Image',
            url: 'https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku-814x1024.jpg',
            author: 'steve',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 3,
            aid: 4,
            name: 'naruto',
            price:550,
            sold:8545,
            like:3.2,
            category:'Image',
            url: 'https://animecorner.me/wp-content/uploads/2022/10/naruto.png',
            author: 'herobrine',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 5,
            aid: 6,
            name: 'sasuke',
            price:1199,
            sold:23,
            like:5.0,
            category:'Image',
            url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
            author: 'bob',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 8,
            aid: 11,
            name: 'goku',
            price:8000,
            sold:414,
            like:4.8,
            category:'Image',
            url: 'https://www.cartonionline.com/wordpress/wp-content/uploads/2023/02/goku-814x1024.jpg',
            author: 'steve',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 9,
            aid: 55,
            name: 'naruto',
            price:550,
            sold:8545,
            like:3.2,
            category:'Image',
            url: 'https://animecorner.me/wp-content/uploads/2022/10/naruto.png',
            author: 'herobrine',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {   
            pid: 57,
            aid: 67,
            name: 'sasuke',
            price:1199,
            sold:23,
            like:5.0,
            category:'Image',
            url: 'https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg',
            author: 'bob',
            intro:'This is a brief introduction to the product.',
            description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        
    ];

    console.log("++++++++++++++++++++++++++++++++++++++++++")
    //console.log(cartContentsData, 15);
    console.log("++++++++++++++++++++++++++++++++++++++++++")

    

    const calculateTotalPrice = () => {
        return DUMMY_DATA.reduce((total, DUMMY_DATA) => total + DUMMY_DATA.price, 0); // TODO
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
            const response = await axios.post('/create-payment-intent', { amount: calculateTotalPrice() });

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
            <div className="form-container">
                <div className="cart-container">
                    <h2 className="form-title">Cart Contents</h2>
                    <ul className="cart-list">
                    {DUMMY_DATA.map((product, index) => (
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