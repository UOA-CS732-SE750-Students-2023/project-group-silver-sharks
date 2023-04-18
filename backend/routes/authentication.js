import express from "express";
import passport from "passport";
import session from "express-session";
import { Account } from "../models/accountModel.js";

const authRouter = new express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.username) {
      return next();
    } else {
      return res.status(401).send({ message: "Please select a username" });
    }
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

authRouter.use(
  session({ secret: "cats", resave: false, saveUninitialized: true })
);
authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);

authRouter.get("/auth/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.email}`);
});

authRouter.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});



export default authRouter;
