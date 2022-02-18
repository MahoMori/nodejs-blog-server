const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const timeout = require("connect-timeout");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./util/db");
require("./strategies/JWTStrategy");
require("./strategies/LocalStrategy");
require("./auth/authenticate");

const userRouter = require("./routes/userRoutes");
const articleRouter = require("./routes/articleRoutes");

const app = express();
app.use(timeout("80s"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

const whitelist = process.env.WHITELIST_DOMAINS
  ? process.env.WHITELIST_DOMAINS.split(",")
  : [];
const corsOption = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOption));
app.use(passport.initialize());

app.use("/users", userRouter);
app.use(articleRouter);

app.get("/", (req, res) => {
  res.send("success");
});

const server = app.listen(process.env.PORT || 8000);
