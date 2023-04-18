import express from "express";
import { getAllAccounts, addAccount } from "../dao/account-dao.js";

import { ReasonPhrases, StatusCodes } from "http-status-codes";
import passport from "passport";
import session from "express-session";
import { Account } from "../models/accountModel.js";

const accountRouter = new express.Router();

// Middle-ware function to ensure authentication of endpoints
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.username) {
      return next();
    } else {
      return res.status(404).send({
        message: `Please select a username ${req.user._id}`,
        id: req.user._id,
      });
    }
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

accountRouter.use(
  session({ secret: "cats", resave: false, saveUninitialized: true })
);
accountRouter.use(passport.initialize());
accountRouter.use(passport.session());

/**
 * Endpoint 1: POST /account/username
 * Adds a username to an existing account without a username.
 * Request body: username
 */
accountRouter.post("/account/username", async (req, res) => {
  try {
    const { username } = req.body;
    const alreadyExists = await Account.findOne({ username });
    console.log(req.body.username);
    if (alreadyExists) {
      res.status(409).send("Username already exists");
    } else if (!/^[a-zA-Z0-9_]+$/.test(req.body.username)) {
      res
        .status(409)
        .send(
          "Invalid username - only numbers, letters and underscores allowed"
        );
    } else {
      const user = await Account.findById(req.user._id);
      user.username = req.body.username;
      await user.save();
      res.send({ message: "Username added successfully" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Unable to add username: ensure you are logged in" });
  }
});

/**
 * Endpoint 2: GET /account
 * Gets all accounts.
 */
accountRouter.get("/account", isLoggedIn, async (req, res) => {
  const { accounts, count } = await getAllAccounts();
  console.log(req.user.email);
  return res.status(StatusCodes.OK).header("Count", count).json(accounts);
});

/**
 * Endpoint 3: GET /account/sign-in
 * Opens Google sign-in page.
 */
accountRouter.get(
  "/account/sign-in",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

/**
 * Endpoint 4: GET /account/sign-out
 * Signs user out.
 */
accountRouter.get("/account/sign-out", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default accountRouter;
