import React from 'react'; 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import PaymentForm from '../components/PaymentForm'

const STRIPE_PUBLIC_KEY="pk_test_51N1lMJFS4UEikyYAt7Nwhaua9GihCbBx7J0Jl7MgqUzuhxfHGF5wwW10ZfoXPQep3gKpvsT9nyNVQYMy98mxrhUE00qyHLmDg1"
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

function StripePage () {
  

  // Must wrap all UI involved with Stripe with Elements tag
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm cartContents={cartContents}/>
    </Elements>
  );
}

export default StripePage;