import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "HOME", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "HOME", videos: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  res.render("search", { pageTitle: "SEARCH", searchingBy, videos });
};
export const getUpload = (req, res) => res.render("upload", { pageTitle: "UPLOAD" });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "VIDEODETAIL" });

export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "EDITVIDEO" });

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "DELETEVIDEO" });
