const dotenv = require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const session = require("express-session");

const login = require("./lib/use-cases/LoginUser");
const createUser = require("./lib/use-cases/CreateUser");
const weather = require("./lib/use-cases/Weather");
const news = require("./lib/use-cases/News");
const searchUser = require("./lib/gateways/searchUser");
const createUserGateway = require("./lib/gateways/createUserGateway");
const dbConnection = require("./lib/pgsqlConnection").pool;

const app = express();

app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
      secure: false,
      httpOnly: false,
    },
  })
);

//"http://dashboard-application-ui.s3-website.eu-west-2.amazonaws.com",

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

// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie("user_sid");
//   }
//   next();
// });

// format of token:
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
  // get the auth header value.
  const bearerHeader = req.headers["authorization"];
  // check if bearer is undefined:
  if (bearerHeader !== undefined) {
    // pull the token  out of the bearer:
    // 1. split the bearer header on the space:
    const bearer = bearerHeader.split(" ");
    // 2. get the token from the aray:
    const bearerToken = bearer[1];
    // set the token:
    req.token = bearerToken;

    next();
  } else {
    // forbidden:
    res.sendStatus(403);
  }
}

// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie("user_sid");
//   }
//   next();
// });

app.get("/status", async (req, res, next) => {
  console.log(req);
  if (req.session.user && req.cookies.user_sid) {
    res.json({
      message: "woo you're a user!",
    });
  } else {
    res.json({
      message: "not signed in init",
    });
  }
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

    jwt.sign({ user }, `${process.env.SECRET_KEY}`, (err, token) => {
      res.json({
        user,
        token,
      });
    });

    //res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
    next(err);
  }
});

app.get("/dashboard", verifyToken, async (req, res, next) => {
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

app.get("/todo", verifyToken, async (req, res, next) => {
  try {
    jwt.verify(req.token, `${process.env.SECRET_KEY}`, (error, authData) => {
      if (error) {
        res.sendStatus(403);
      } else {
        res.json({ message: "to do list:", authData });
      }
    });
  } catch (err) {
    res.send(400);
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
//module.exports.handler = serverless(app);
