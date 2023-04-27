/* eslint-disable import/first */
import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

function handleListening() {
  console.log(`LISTENING ON http://localhost:${PORT}`);
}
app.listen(PORT, handleListening);
