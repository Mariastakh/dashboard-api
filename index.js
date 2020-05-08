const express = require("express");
const bcrypt = require("bcrypt");
const login = require("./lib/use-cases/LoginUser");
const searchUser = require("./lib/gateways/searchUser");

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
 const weather = getWeather();
 const news = getNews();
 const football = getFootballUpdate();
 const todoList = getToDoList();
 const warmer = getWarmer();
 const photos = getPhotos();
 const dashboard = [weather, news, football, toDoList, warmer, photos];
  res.send("widgets");
})

app.get("/todo", (req, res) => {
  res.send("to do list");
})

app.get("/news", (req, res) => {
  res.send("news");
})

app.get("/football", (req, res) => {
  res.send("football");
})

app.get("/photos", (req, res) => {
  res.send("paths");
})

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

module.exports = app;
