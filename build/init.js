"use strict";

require("@babel/polyfill");
var _dotenv = _interopRequireDefault(require("dotenv"));
require("./db");
var _app = _interopRequireDefault(require("./app"));
require("./models/Video");
require("./models/Comment");
require("./models/User");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint-disable import/first */

_dotenv["default"].config();
var PORT = process.env.PORT || 4000;
function handleListening() {
  console.log("LISTENING ON http://localhost:".concat(PORT));
}
_app["default"].listen(PORT, handleListening);