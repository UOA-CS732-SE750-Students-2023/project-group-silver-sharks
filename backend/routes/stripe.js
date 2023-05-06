// routes/stripeRoutes.js

import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripeRouter = express.Router();

// Create payment intent for stripe that sends balance to target account
stripeRouter.post('/create-payment-intent', async (req, res) => {
  const { amount, connectedAccountId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
      transfer_data: {
        destination: connectedAccountId,
      },
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Authenticate users with a stripe ID so that they can set up receiving funds
stripeRouter.get('/oauth/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    const connectedAccountId = response.stripe_user_id;

    // Save the connected account ID to your database and associate it with the user

    res.redirect('/your-success-page'); // Redirect the user to a success page in your frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


export default stripeRouter;