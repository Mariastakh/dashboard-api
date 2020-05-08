const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const login = require("./lib/use-cases/LoginUser");
const searchUser = require("./lib/gateways/searchUser");
const weather = require("./lib/use-cases/Weather");
const news = require("./lib/use-cases/News");
const getToDoList = require("./lib/use-cases/ToDoList/getToDoList");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  user = { username: req.body.name, password: req.body.password };
  response = login({ user: user, gateway: searchUser });
  res.send(response);
});

app.get("/dashboard", (req, res) => {
  const weather = weather();
  const news = getNews();
  const football = getFootballUpdate();
  const todoList = getToDoList();
  const warmer = getWarmer();
  const photos = getPhotos();
  const dashboard = [weather, news, football, toDoList, warmer, photos];
  res.send("widgets");
});

app.get("/todo", (req, res) => {
  username = "Maria"
  result = getToDoList({username: username, gateway: getToDoListGateway});
  res.send(result);
});

app.get("/news", async (req, res) => {
  const newsUpdate = await news();
  res.send(newsUpdate);
});

app.get("/football", (req, res) => {
  res.send("football");
});

app.get("/photos", (req, res) => {
  res.send("paths");
});

app.get("/weather", async (req, res) => {
  const weatherUpdate = await weather();
  res.send(weatherUpdate);
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

module.exports = app;
