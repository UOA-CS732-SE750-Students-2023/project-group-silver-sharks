import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Account } from "./models/accountModel.js";
import mongoose from "mongoose";

const GOOGLE_CLIENT_ID =
  "149590736173-qim8abtnndvu7fs6r7bgph2rqqdf0tf4.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let account = await Account.findById(profile.id);
        if (!account) {
          account = await Account.create({ _id: profile.id, username: profile.displayName, email: profile.email });
        }
        return done(null, account);
      } catch (err) {
        return done(err, null);
      }
    }    
    // function(request, accessToken, refreshToken, profile, done) {
    //   return done(null, profile);
    // }));
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
