// init project
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const hljs = require("highlight.js");
const cors = require("cors");
const bodyparser = require("body-parser");
const paste = require("../models/paste.js");

// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", (req, res) => {
  console.log("Welcome to code dump");
  res.send("Welcome to code dump");
});

// app.post("/check", (req, res) => {
//   console.log(req.body);

//   const result = hljs.highlightAuto(req.body.content);
//   console.log(result.language);
//   res.send(result.language);
// });

app.post("/create", (req, res) => {
  console.log(req.body);
  const obj = { content: req.body.content };
  console.log(obj);
  paste
    .create(obj)
    .then((data) => {
      console.log(typeof data._id.toString());
      const shortid = Buffer.from(data._id.toString(), "hex");
      res.send(shortid.toString("base64"));
    })
    .catch((err) => {
      console.log("There is an error in creating document", err);
      res.send(err);
    });
});

app.get("read/:id", (req, res) => {
  console.log(req.params.id);
  const readid = Buffer.from(req.params.id, "base64").toString("hex");
  paste
    .findById(readid)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(8080, () => {
  console.log("App is listening");
});

// var b = Buffer.from("507f1f77bcf86cd799439011", "hex");
// res.send(b.toString("base64"));
// var b = Buffer.from("UH8fd7z4bNeZQ5AR", "base64");
// res.send(b.toString("hex"));
