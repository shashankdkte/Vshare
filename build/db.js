"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// export const videoFiles = [
//   {
//     id: 12345,
//     title: "First Video File",
//     description: "Video has been uploaded",
//     views: 24,
//     videoFile: "./sample5.mp4",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com",
//     },
//   },
//   {
//     id: 23456,
//     title: "Second Video File",
//     description: "Video has been uploaded",
//     views: 24,
//     videoFile: "./sample2.mp4",
//     creator: {
//       id: 232323,
//       name: "Michael",
//       email: "micha@las.com",
//     },
//   },
//   {
//     id: 34567,
//     title: "Third Video File",
//     description: "Video has been uploaded",
//     views: 24,
//     videoFile: "sample6.mp4",
//     creator: {
//       id: 232323,
//       name: "Michael",
//       email: "micha@las.com",
//     },
//   },
//   {
//     id: 45678,
//     title: "Fourth Video File",
//     description: "Video has been uploaded",
//     views: 24,
//     videoFile: "sample3.mp4",
//     creator: {
//       id: 343434,
//       name: "Harold",
//       email: "harod@las.com",
//     },
//   },
//   {
//     id: 56789,
//     title: "Fifth Video File",
//     description: "Video has been uploaded",
//     views: 24,
//     videoFile: "sample4.mp4",
//     creator: {
//       id: 232323,
//       name: "Michael",
//       email: "micha@las.com",
//     },
//   },
// ];
var mongoose = require("mongoose");
_dotenv["default"].config();
mongoose.connect(process.env.MONGO_PROD_URL, {
  useNewUrlParser: true
});
var db = mongoose.connection;
var handleOpen = function handleOpen() {
  return console.log("Connection open");
};
db.once("open", handleOpen);
db.on("error", function () {
  console.log("error");
});