import express from "express";
import mongoose from "mongoose";
import { 
    getAllAccounts,
    addAccount
} from "../dao/account-dao.js";

import { ReasonPhrases, StatusCodes } from "http-status-codes";
import passport from "passport";
import session from "express-session";


const accountRouter = new express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

accountRouter.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
accountRouter.use(passport.initialize());
accountRouter.use(passport.session());



// endpoint 1: GET all accounts without worrying about pagination
accountRouter.get("/account", isLoggedIn, async (req, res) => {
  const { accounts, count } = await getAllAccounts();

  return res.status(StatusCodes.OK).header("Count", count).json(accounts);
});


// endpoint 2: POST - adding account
accountRouter.post('/account', async (req,res) => {
    const newAccount = await addAccount(req.body);

    return res.status(StatusCodes.CREATED)
              .header('Location', `/products/${newAccount._id}`)
              .json(newAccount);
});

// endpoint 3: GET signing in
accountRouter.get(
  "/account/sign-in",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// endpoint 4: GET signing out
accountRouter.get('/account/sign-out', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


export default accountRouter;
