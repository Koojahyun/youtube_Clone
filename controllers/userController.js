import routes from "../routes";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "JOIN" });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    //alert Password was wrong
    res.status(400);
    res.render("join", { pageTitle: "JOIN" });
  } else {
    //todo : register User
    //todo : log user in
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "LOGIN" });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  //todo : Process log out
  res.redirect(routes.home);
};
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "USERDETAIL" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "EDITPROFILE" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "CHANGEPASSWORD" });
