import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;

function handleListening() {
  console.log(`LISTENING ON http://localhost:${PORT}`);
}
app.listen(PORT, handleListening);
