require("dotenv").config({ path: `${__dirname}/process.env` });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const paste = require("../models/paste.js");
const { default: base64url } = require("base64url");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");
})

app.get("/api", (req, res) => {
  console.log("Welcome to code dump");
  res.send("Welcome to code dump");
});

app.post("/api/create", (req, res) => {
  const obj = { content: req.body.code };
  console.log("Content", obj);
  paste
    .create(obj)
    .then((data) => {
      const idBuffer = Buffer.from(data._id.toString(), "hex");
      const idBase64 = idBuffer.toString("base64");
      const idBase64url = base64url.fromBase64(idBase64);
      const json = {id: idBase64url};
      res.json(json);
    })
    .catch((err) => {
      console.log("There is an error in creating document", err);
      res.send(err);
    });
});

app.get("/api/read/:id", (req, res) => {
  const idBase64 = base64url.toBase64(req.params.id);
  const readid = Buffer.from(idBase64, "base64").toString("hex");
  paste
    .findById(readid)
    .then((data) => {
      console.log("Content:", data.content);
      res.setHeader('Cache-Control', 'max-age=31,536,000, s-max-age=31,536,000, public');
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = app