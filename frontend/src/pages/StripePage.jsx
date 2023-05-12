import React from 'react'; 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm'

const STRIPE_PUBLIC_KEY="pk_test_51N1lMJFS4UEikyYAt7Nwhaua9GihCbBx7J0Jl7MgqUzuhxfHGF5wwW10ZfoXPQep3gKpvsT9nyNVQYMy98mxrhUE00qyHLmDg1"
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

function StripePage () {
  const cartData = useLoaderData(); 

  // Must wrap all UI involved with Stripe with Elements tag
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm cartContentsData={cartData}/>
    </Elements>
  );
}

export default StripePage;

export const loader = async ({request,params}) => {

  // Get cart response
  const cartResponse = await fetch('http://localhost:3000/account/cart');
            
  if (!cartResponse.ok) {
      throw new Error(`HTTP error! cannot get cart: ${cartResponse.status}`);
  }

  const data = await cartResponse.json();

  const cartContents = data.cartContents;

  return cartContents;
};

export const action = async ({request,params}) => {
  // getting the http method from the request argument
  const method = request.method;

  // check whether the request is a delete or a post

  const response = await fetch("http://localhost:3000/account/cart/clear", {
      method: method,
  });

  if (!response.ok){ 
      throw json({ message: 'Could not clear cart contents.'}, { status: 500 });
  }

  // redirect to the current page
  return true;
}