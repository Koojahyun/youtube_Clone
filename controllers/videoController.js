import { videos } from "../db";
import routes from "../routes";

export const home = (req, res) => {
  res.render("home", { pageTitle: "HOME", videos });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  res.render("search", { pageTitle: "SEARCH", searchingBy, videos });
};
export const getUpload = (req, res) => res.render("upload", { pageTitle: "UPLOAD" });
export const postUpload = (req, res) => {
  const {
    body: { file, title, description }
  } = req;
  //Todo : Upload and save video
  res.redirect(routes.videoDetail(1123));
};
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "VIDEODETAIL" });

export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "EDITVIDEO" });

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "DELETEVIDEO" });
