// routes/stripeRoutes.js

import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { Account } from "../models/accountModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripeRouter = express.Router();

// Create payment intent for stripe that sends balance to target account
stripeRouter.post("/create-payment-intent", async (req, res) => {
  const { userId, amount, connectedAccountId, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      payment_method: paymentMethodId,
      transfer_data: {
        destination: connectedAccountId,
      },
    });

    // Store the balance of the user
    console.log("Adding balance to user: " + userId);

    const userAccount = await Account.findById(userId);

    console.log("User account:");

    console.log(userAccount);

    userAccount.balance += amount;
    await userAccount.save();

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Authenticate users with a stripe ID so that they can set up receiving funds
stripeRouter.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code,
    });

    const connectedAccountId = response.stripe_user_id;
    const accountId = req.user.id;

    const userAccount = await Account.findById(accountId);

    if (!userAccount.stripeId) {
      userAccount.stripeId = connectedAccountId;
    }

    await userAccount.save();

    // Save the connected account ID to your database and associate it with the user
    res.redirect("/store/profile"); // Redirect the user to a profile page
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default stripeRouter;
