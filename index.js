import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();
const PORT = 4000;

function handleListening() {
  console.log(`LISTENING ON http://localhost:${PORT}`);
}

const homeHandler = (req, res, next) => {
  console.log("ROUTE TO HOME");
  res.send("HOME PAGE");
};
const middleHandler = (req, res, next) => {
  console.log("MIDDLEWARE");
  next();
};
const profileHandler = (req, res, next) => {
  console.log("ROUTE TO PROFILE");
  res.send("PROFILE PAGE");
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.get("/", homeHandler);
app.get("/profile", profileHandler);

app.listen(PORT, handleListening);
//--delay 2
