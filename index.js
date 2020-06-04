const dotenv = require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const jwt = require("jsonwebtoken");
// const session = require("express-session");
// const { uuid } = require("uuidv4");
const aws = require("aws-sdk");

const login = require("./lib/use-cases/LoginUser");
const createUser = require("./lib/use-cases/CreateUser");
const weather = require("./lib/use-cases/Weather");
const news = require("./lib/use-cases/News");
const searchUser = require("./lib/gateways/searchUser");
const createUserGateway = require("./lib/gateways/createUserGateway");
const searchTasksGateway = require("./lib/gateways/searchTasksGateway");
const searchTasks = require("./lib/use-cases/searchTasks");
const createImage = require("./lib/use-cases/createImage");
const createImageGateway = require("./lib/gateways/createImageGateway");
const getTeams = require("./lib/use-cases/GetTeams");
const dbConnection = require("./lib/pgsqlConnection").pool;

aws.config.update({
  region: "eu-west-2",
  // accessKeyId: process.env.S3AccessKeyId,
  // secretAccessKey: process.env.S3SecretKey
});

const S3_BUCKET = process.env.bucket;

const app = express();

app.use(bodyParser.json());
app.use(expressSanitizer());

//http://dashboard-application-ui.s3-website.eu-west-2.amazonaws.com
//http://localhost:3000

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers that are allowed:
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Origin, Authorization"
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

app.post("/register", async (req, res, next) => {
  try {
    const sanitizedUsername = req.sanitize(req.body.username);
    const sanitizedPassword = req.sanitize(req.body.password);
    const sanitizedEmail = req.sanitize(req.body.email);

    const user = {
      username: sanitizedUsername,
      password: sanitizedPassword,
      email: sanitizedEmail,
    };
    const createdUser = await createUser({
      user: user,
      gateway: createUserGateway({ user: user, db: dbConnection }),
    });

    // upload image to s3
    const s3 = new aws.S3();
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;

    // Save image name in db:
    await createImage({
      userId: createdUser,
      imageName: fileName,
      gateway: createImageGateway({ db: dbConnection }),
    });

    // Set up the payload to send to the s3 api
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 500,
      ContentType: fileType,
      ACL: "public-read",
    };

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
  } catch (err) {
    res.sendStatus(400);
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
        { name: "do something", status: false, id: 1 },
        { name: "do something else", status: true, id: 2 },
      ],
    });
  } catch (err) {
    next(err);
  }
});

app.post("/update-task", async (req, res, next) => {
  console.log(req);
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

app.get("/teams/:winningTeam", async (req, res, next) => {
  const winningTeam = req.params.winningTeam;

  await getTeams({ winningTeam, res }).catch((err) => {
    next(err);
  });
});

app.get("/photos", (req, res, next) => {
  try {
    // jwt.verify(req.token, `${process.env.SECRET_KEY}`, (error, authData) => {
    //   if (error) {
    //     res.sendStatus(403);
    //   } else {
    const decoded = jwt.verify(req.token, process.env.SECRET_KEY);
    const user = decoded.user.username;

    const s3 = new aws.S3();

    // Create the parameters for calling listObjects
    var bucketParams = {
      Bucket: process.env.Bucket,
    };

    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
    // query the db
    //  }
    //  });
  } catch (err) {
    res.sendStatus(400);
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
// module.exports.handler = serverless(app);
