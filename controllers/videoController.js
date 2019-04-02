export const home = (req, res) => res.render("home", { pageTitle: "HOME" });

export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  res.render("search", { pageTitle: "SEARCH", searchingBy });
};
export const upload = (req, res) => res.render("upload", { pageTitle: "UPLOAD" });

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "VIDEODETAIL" });

export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "EDITVIDEO" });

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "DELETEVIDEO" });
