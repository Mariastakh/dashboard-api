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

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

module.exports = app;
