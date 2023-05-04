import React from 'react'; 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm'

const STRIPE_PUBLIC_KEY="pk_test_51N1lMJFS4UEikyYAt7Nwhaua9GihCbBx7J0Jl7MgqUzuhxfHGF5wwW10ZfoXPQep3gKpvsT9nyNVQYMy98mxrhUE00qyHLmDg1"
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

function StripePage () {
  const data = useLoaderData(); 

  console.log(data, 12);
  

  // Must wrap all UI involved with Stripe with Elements tag
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm cartContentsData={data}/>
    </Elements>
  );
}

export default StripePage;

export const loader = async ({request,params}) => {

  const response = await fetch('http://localhost:3000/account/cart');
            
  // Check if the response status is ok
  if (!response.ok) {
      throw new Error(`HTTP error! cannot get cart: ${response.status}`);
  }

  const data = await response.json();

  const cartContents = data.cartContents;
  console.log("line 38" + cartContents);
  
  return cartContents;
};