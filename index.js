const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const dotenv = require("dotenv").config();
const login = require("./lib/use-cases/LoginUser");
const createUser = require("./lib/use-cases/CreateUser");
const weather = require("./lib/use-cases/Weather");
const news = require("./lib/use-cases/News");
const pie = require("./lib/utility/pie");
const searchUser = require("./lib/gateways/searchUser");
const createUserGateway = require("./lib/gateways/createUserGateway");
const dbConnection = require("./lib/pgsqlConnection").pool;

const app = express();

app.use(bodyParser.json());
app.use(expressSanitizer());

//http://dashboard-application-ui.s3-website.eu-west-2.amazonaws.com

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers that are allowed:
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Allow cookeies:
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/signup", async (req, res, next) => {
  try {
    const sanitizedUsername = req.sanitize(req.body.username);
    const sanitizedPassword = req.sanitize(req.body.password);
    const sanitizedEmail = req.sanitize(req.body.email);

    const user = {
      username: sanitizedUsername,
      password: sanitizedPassword,
      email: sanitizedEmail,
    };
    await createUser({
      user: user,
      gateway: createUserGateway({ user: user, db: dbConnection }),
    });

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(400);
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const sanitizedUsername = req.sanitize(req.body.username);
    const sanitizedPassword = req.sanitize(req.body.password);

    const user = {
      username: sanitizedUsername,
      password: sanitizedPassword,
    };

    await login({
      user: user,
      gateway: searchUser({ user: user, db: dbConnection }),
    });

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
    next(err);
  }
});

app.get("/dashboard", async (req, res, next) => {
  try {
    const weatherReport = await weather();
    // const news = await getNews();
    // const football = await getFootballUpdate();
    // const todoList = await getToDoList();
    // const warmer = await getWarmer();
    // const photos = await getPhotos();
    const dashboard = [weatherReport];
    res.json({
      weather: weatherReport,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/todo", (req, res, next) => {
  try {
    res.send("to do list");
  } catch (err) {
    next(err);
  }
});

app.get("/news", async (req, res, next) => {
  try {
    const newsUpdate = await news();
    res.send(newsUpdate);
  } catch (err) {
    next(err);
  }
});

app.get("/football", (req, res, next) => {
  try {
    process.env.PRODUCTION_DB_USER;
    res.send("football");
  } catch (err) {
    next(err);
  }
});

app.get("/pie", async (req, res, next) => {
  try {
    const result = await pie();
    res.json({
      pie:result,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/photos", (req, res, next) => {
  try {
    res.send("paths");
  } catch (err) {
    next(err);
  }
});

app.post("/weather", async (req, res, next) => {
  try {
    const location = req.body;
    const weatherReport = await weather(location);

    res.json({
      weather: weatherReport,
    });
  } catch (err) {
    next(err);
  }
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

module.exports = app;
//module.exports.handler = serverless(app);
