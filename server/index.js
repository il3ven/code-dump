require("dotenv").config({ path: `${__dirname}/process.env` });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const paste = require("./models/paste.js");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  console.log("Welcome to code dump");
  res.send("Welcome to code dump");
});

app.post("/create", (req, res) => {
  const obj = { content: req.body.content };
  console.log("Content", obj);
  paste
    .create(obj)
    .then((data) => {
      const shortid = Buffer.from(data._id.toString(), "hex");
      const json = {id: shortid.toString("base64")};
      res.json(json);
    })
    .catch((err) => {
      console.log("There is an error in creating document", err);
      res.send(err);
    });
});

app.get("/read/:id", (req, res) => {
  console.log("Read Request ID:", req.params.id);
  const readid = Buffer.from(req.params.id, "base64").toString("hex");
  paste
    .findById(readid)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.listen(8080, () => {
  console.log("App is listening");
});
