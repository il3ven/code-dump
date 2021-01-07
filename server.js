const express = require("express");
const apiRouter = require("./api/index");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.use("/api", apiRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3000, () => {
  console.log("App running");
});
