"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _passport = _interopRequireWildcard(require("passport"));
var _User = _interopRequireDefault(require("./models/User"));
var _userControllers = require("./controllers/userControllers");
var _routes = _interopRequireDefault(require("./routes"));
var _passportFacebook = _interopRequireDefault(require("passport-facebook"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/order, import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies
// import GitHubStrategy from "passport-github";
// eslint-disable-next-line import/order, import/no-extraneous-dependencies
var GitHubStrategy = require("passport-github").Strategy;
var LocalStrategy = require("passport-local").Strategy;
_passport["default"].use(new LocalStrategy(function (email, password, done) {
  _User["default"].findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  });
}));
_passport["default"].use(_User["default"].createStrategy());
_passport["default"].use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:4000/auth/github/callback"
}, _userControllers.githubLoginCallback));
_passport["default"].use(new _passportFacebook["default"]({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, _userControllers.facebookLoginCallback));
_passport["default"].serializeUser(function (user, done) {
  done(null, user);
});
_passport["default"].deserializeUser(function (user, done) {
  done(null, user);
});

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());