export const join = (req, res) => res.render("join", { pageTitle: "JOIN" });
export const login = (req, res) => res.render("login", { pageTitle: "LOGIN" });
export const logout = (req, res) => res.render("logout", { pageTitle: "LOGOUT" });
export const users = (req, res) => res.render("user", { pageTitle: "USERS" });
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "USERDETAIL" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "EDITPROFILE" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "CHANGEPASSWORD" });
