// routes/stripeRoutes.js

import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeRouter = express.Router();

stripeRouter.post('/stripe/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default stripeRouter;
