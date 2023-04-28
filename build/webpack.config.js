"use strict";

var path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var MODE = "production";
var ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
var OUTPUT_DIR = path.join(__dirname, "static");
var config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [{
      test: /\.(js)$/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.scss$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
    }]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  }
};
module.exports = config;