/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import passport, { serializeUser } from "passport";
import User from "./models/User";
import {
  facebookLoginCallback,
  githubLoginCallback,
} from "./controllers/userControllers";
import routes from "./routes";
// eslint-disable-next-line import/order, import/no-extraneous-dependencies
import FacebookStrategy from "passport-facebook";
// eslint-disable-next-line import/no-extraneous-dependencies
// import GitHubStrategy from "passport-github";
// eslint-disable-next-line import/order, import/no-extraneous-dependencies
const GitHubStrategy = require("passport-github").Strategy;

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (email, password, done) {
    User.findOne({ email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    });
  })
);
passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:4000/auth/github/callback`,
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    facebookLoginCallback
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
