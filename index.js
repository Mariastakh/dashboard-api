const dotenv = require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const { uuid } = require("uuidv4");
const aws = require("aws-sdk");

const login = require("./lib/use-cases/LoginUser");
const createUser = require("./lib/use-cases/CreateUser");
const weather = require("./lib/use-cases/Weather");
const news = require("./lib/use-cases/News");
const searchUser = require("./lib/gateways/searchUser");
const createUserGateway = require("./lib/gateways/createUserGateway");
const searchTasksGateway = require("./lib/gateways/searchTasksGateway");
const searchTasks = require("./lib/use-cases/searchTasks");
const dbConnection = require("./lib/pgsqlConnection").pool;

aws.config.update({
  region: "eu-west-2",
  // accessKeyId: process.env.S3AccessKeyId,
  // secretAccessKey: process.env.S3SecretKey
});

const S3_BUCKET = process.env.bucket;

const app = express();
// app.use(
//   session({
//     genid: (req) => {
//       // console.log('Inside the session middleware')
//       // console.log(req.sessionID)
//       return uuid(); // use UUIDs for session IDs
//     },
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

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
    "X-Requested-With,content-type, authorization"
  );

  // Allow cookeies:
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

function verifyToken(req, res, next) {
  // get the auth header value.
  //console.log("headers :", req.headers);
  const bearerHeader = req.headers["authorization"];
  console.log("bearer header :", bearerHeader);
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

app.post("/signup", async (req, res, next) => {
  try {
    // console.log("LOGIN sesh", req.session);
    // console.log("LOGIN sesh id", req.sessionID);
    // console.log("LOGIN sesh user?", req.session.user);
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

    // req.session.user = user;

    jwt.sign({ user }, `${process.env.SECRET_KEY}`, (err, token) => {
      res.json({
        user,
        token,
      });
    });
  } catch (err) {
    res.sendStatus(400);
    next(err);
  }
});

app.post("/upload-image", async (req, res, next) => {
  const s3 = new aws.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  // Set up the payload to send to the s3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: "public-read",
  };

  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }

    // Data payload of what we are sending back,
    // the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    res.json({ success: true, data: { returnData } });
  });
});

app.get("/dashboard", verifyToken, async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

app.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await searchTasks({
      user: "james",
      gateway: searchTasksGateway({ user: "james", db: dbConnection }),
    });
    console.log(tasks);

    res.json({
      tasks: [
        { name: "do something", status: false },
        { name: "do something", status: true },
      ],
    });
  } catch (err) {
    next(err);
  }
});

app.get("/news", async (req, res, next) => {
  try {
    const newsUpdate = await news();
    res.json({
      news: newsUpdate,
    });
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

app.get("/photos", verifyToken, (req, res, next) => {
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
