// eslint-disable-next-line import/no-extraneous-dependencies
import passport, { serializeUser } from "passport";
// eslint-disable-next-line import/no-extraneous-dependencies
// import GitHubStrategy from "passport-github";
// eslint-disable-next-line import/order, import/no-extraneous-dependencies
const GitHubStrategy = require("passport-github").Strategy;
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userControllers";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: "f913a46786e81f412f13",
      clientSecret: "309eb9e605b2bd17ab1efdc45acb271319da2c80",
      callbackURL: `http://localhost:4000/auth/github/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const {
        _json: { id, avatar_url, name, email },
      } = profile;
      console.log("INSIDE githubLoginCallback");
      const user = await User.findOne({ email });
      console.log("user ->", user);
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url,
      });
      return cb(null, newUser);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, User);
});

passport.deserializeUser(function (user, done) {
  done(null, User);
});
