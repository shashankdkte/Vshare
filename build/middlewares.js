"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadVideo = exports.uploadAvatar = exports.onlyPublic = exports.onlyPrivate = exports.localMiddleware = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _multerS = _interopRequireDefault(require("multer-s3"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _routes = _interopRequireDefault(require("./routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-south-1"
});
// const multerVideo = multer({ dest: "uploads/videos/" });
// const multerAvatar = multer({ dest: "uploads/avatars/" });
var multerVideo = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "vshare-values/video"
  })
});
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "vshare-values/avatar"
  })
});
var uploadVideo = multerVideo.single("file");
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;
var localMiddleware = function localMiddleware(req, res, next) {
  res.locals.siteName = "VShare";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  next();
};
exports.localMiddleware = localMiddleware;
var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};
exports.onlyPublic = onlyPublic;
var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes["default"].home);
  }
};
exports.onlyPrivate = onlyPrivate;