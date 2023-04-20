import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Account } from "./models/accountModel.js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

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
          account = await Account.create({
            _id: profile.id,
            email: profile.email,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          });
        }

        return done(null, account);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await Account.findById(id);
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});
