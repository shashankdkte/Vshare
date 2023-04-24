import routes from "../routes";

// JOIN
export const getJoin = (req, res) => res.render("join", { pageTitle: "JOIN" });
export const postJoin = (req, res) => {
  const {
    body: { password, password2 },
  } = req;
  console.log(req.body);
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "JOIN" });
  } else {
    res.redirect(routes.home);
  }
};

// LOGIN
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "LOGIN" });
export const postLogin = (req, res) => res.redirect(routes.home);
export const logout = (req, res) =>
  res.render("logout", { pageTitle: "LGOUT" });

// USERS
export const users = (req, res) => res.render("users", { pageTitle: "USERS" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "USER DETAIL" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EDIT PROFILE" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "CHANGE PASSWORD" });
