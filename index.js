const express = require("express");
const bcrypt = require("bcrypt");
const login = require("./lib/use-cases/LoginUser");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  user = { name: req.body.name, password: req.body.password };
  response = login(user);
  res.send(response);
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

module.exports = app;
