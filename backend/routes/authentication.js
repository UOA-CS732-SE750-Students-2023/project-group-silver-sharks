import express from "express";
import passport from "passport";
import session from "express-session";

const authRouter = new express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

authRouter.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
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
  res.send(`Hello ${req.user.displayName}`);
});

authRouter.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

export default authRouter;
