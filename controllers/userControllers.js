/* eslint-disable no-underscore-dangle */
import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// JOIN
export const getJoin = (req, res) => res.render("join", { pageTitle: "JOIN" });
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "JOIN" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      console.log("user", user);
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.render("userDetail", {
    pageTitle: "User Detail",
    user,
    loggedUser: user,
  });
};
// LOGIN
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "LOGIN" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name: userName, email: userEmail },
  } = profile;
  // console.log(profile._json);
  try {
    const user = await User.findOne({ userEmail });
    console.log("userLoginCallback ->", user);
    if (user) {
      console.log("inside user");
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    console.log("outside user");
    console.log(userEmail, userName);
    const newUser = await User.create({
      email: userEmail,
      name: userName,
      githubId: id,
      avatarUrl,
    });
    console.log(newUser);
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout(function (err) {
    if (!err) {
      res.redirect(routes.home);
    }
  });
};
// USERS
export const users = (req, res) => res.render("users", { pageTitle: "USERS" });

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// PROFILE
export const getEditProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.render("editProfile", { pageTitle: "Edit Profile", loggedUser: user });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
    user: { _id },
  } = req;
  // console.log("post Edit ->", req.user);
  console.log("id", _id);
  try {
    await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          name,
          email,
          avatarUrl: file != null ? file.location : req.user.avatarUrl,
        },
      },
      { new: true }
    );

    await res.redirect(routes.me);
  } catch (error) {
    res.redirect("editProfile", { pageTitle: "Edit Profile" });
  }
};

// PASSWORD

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    const user = await User.findById(req.user._id);
    await user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};

// FACEBOOK LOGIN
export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};
