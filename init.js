import "./db";
import dotenv from "dotenv";
import app from "./app";

import "./models/Video";
import "./models/Comment";

dotenv.config();
const PORT = process.env.PORT || 4000;

function handleListening() {
  console.log(`LISTENING ON http://localhost:${PORT}`);
}
app.listen(PORT, handleListening);
