const express = require("express");
require("dotenv").config();
const login = require("./lib/use-cases/LoginUser");
const signUpUser = require("./lib/use-cases/SignUpUser");
const weather = require("./lib/use-cases/Weather");
const news = require("./lib/use-cases/News");
const searchUser = require("./lib/gateways/searchUser");
const signUpUserGateway = require("./lib/gateways/signUpUserGateway");
const dbConnection = require("./lib/pgsqlConnection").pool;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    await signUpUser({
      user: user,
      gateway: signUpUserGateway({ user: user, db: dbConnection }),
    });

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(400);
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  try {
    user = { username: req.body.username, password: req.body.password };

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
    const weather = await weather();
    const news = await getNews();
    const football = await getFootballUpdate();
    const todoList = await getToDoList();
    const warmer = await getWarmer();
    const photos = await getPhotos();
    const dashboard = [weather, news, football, toDoList, warmer, photos];
    res.send(dashboard);
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
    res.send("football");
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

app.get("/weather", async (req, res, next) => {
  try {
    const weatherUpdate = await weather();
    res.send(weatherUpdate);
  } catch (err) {
    next(err);
  }
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

module.exports = app;
