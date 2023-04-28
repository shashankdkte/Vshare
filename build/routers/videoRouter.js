"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _routes = _interopRequireDefault(require("../routes"));
var _videoControllers = require("../controllers/videoControllers");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var videoRouter = _express["default"].Router();
videoRouter.get(_routes["default"].videos, _videoControllers.videos);
// Upload
videoRouter.get(_routes["default"].upload, _middlewares.onlyPrivate, _videoControllers.getUpload);
videoRouter.post(_routes["default"].upload, _middlewares.onlyPrivate, _middlewares.uploadVideo, _videoControllers.postUpload);

// Video Detail
videoRouter.get(_routes["default"].videoDetail(), _videoControllers.videoDetail);

// Edit Video
videoRouter.get(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoControllers.getEditVideo);
videoRouter.post(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoControllers.postEditVideo);

// Delete Video
videoRouter.get(_routes["default"].deleteVideo(), _middlewares.onlyPrivate, _videoControllers.deleteVideo);
var _default = videoRouter;
exports["default"] = _default;