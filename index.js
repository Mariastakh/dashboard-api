const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  user = res.send("Login Successful!");
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

module.exports = app;
