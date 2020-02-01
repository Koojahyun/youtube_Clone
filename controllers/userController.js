import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "JOIN" });
};

export const postJoin = async (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    //alert Password was wrong
    res.status(400);
    res.render("join", { pageTitle: "JOIN" });
  } else {
    try {
      const user = await User.create({
        name,
        email
      });
      User.register(user.password);
    } catch (error) {
      console.log(error);
    }
    //todo : log user in
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "LOGIN" });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  //todo : Process log out
  res.redirect(routes.home);
};
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "USERDETAIL" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EDITPROFILE" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "CHANGEPASSWORD" });
