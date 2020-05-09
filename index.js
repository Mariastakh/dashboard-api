const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const login = require("./lib/use-cases/LoginUser");
const searchUser = require("./lib/gateways/searchUser");
const weather = require("./lib/use-cases/Weather");
const news = require("./lib/use-cases/News");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res, next) => {
  try {
    user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    response = await signin({ user: user, gateway: createUser });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(400);
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  try {
    user = { username: req.body.name, password: req.body.password };
    response = await login({ user: user, gateway: searchUser });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.post("/signup", async (req, res, next) => {
  try {
    const user = {
      username: req.body.name,
      password: req.body.password,
      email: req.body.email,
    };
    const response = await createNewUser();
    res.sendStatus(200);
  } catch (err) {
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
