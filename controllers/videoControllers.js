/* eslint-disable no-underscore-dangle */
// import { videoFiles } from "../db";
import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videoFiles = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "HOME", videos: videoFiles });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "HOME", videos: [] });
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", {
    pageTitle: "SEARCH",
    searchingBy,
    videos,
  });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "VIDEOS" });
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "UPLOAD" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user._id,
  });
  const user = await User.findById(req.user._id);
  await user.videos.push(newVideo.id);
  await user.save();

  res.redirect(routes.videoDetail(newVideo.id));
  // res.render("upload", { pageTitle: "Upload" });
  // res.redirect(routes.videoDetail(34567));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.redirect(routes.home);
    }
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: "VIDEO DETAIL", video, user });
  } catch (error) {}
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);

    if (video.creator !== req.user._id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `EDIT  ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {}
  res.redirect(routes.home);
};

// REGISTER VIDEO
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById({ _id: id });

    video.views += 1;
    video.save();
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
  } finally {
    res.end();
  }
};

// EXPORT POST ADD COMMENT

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user._id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};
