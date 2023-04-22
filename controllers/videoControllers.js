import { videoFiles } from "../db";
import routes from "../routes";

export const home = (req, res) =>
  res.render("home", { pageTitle: "HOME", videos: videoFiles });

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", {
    pageTitle: "SEARCH",
    searchingBy: searchingBy,
    videos: videoFiles,
  });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "VIDEOS" });
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "UPLOAD" });

export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  console.log(file);
  res.redirect(routes.videoDetail(34567));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "VIDEO DETAIL" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "EDIT VIDEO" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "DELETE VIDEO" });
