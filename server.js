require("dotenv").config();
const express = require("express");
const apiRouter = require("./api/index");
const path = require("path");

const app = express();

const { Stats } = require("express-simple-stats");
const stats = Stats(process.env.expressStatsPwd);
app.use("/api/stats", stats.router);
app.use(stats.middleware);

const setNoCache = (res) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  res.setHeader("Expires", date.toUTCString());
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Cache-Control", "public, no-cache");
};

const setLongTermCache = (res) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  res.setHeader("Expires", date.toUTCString());
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
};

app.use(
  express.static(path.join(__dirname, "build"), {
    extensions: ["html"],
    setHeaders(res, path) {
      if (path.match(/(\.html|\/sw\.js)$/)) {
        setNoCache(res);
        return;
      }

      if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
        setLongTermCache(res);
      }
    },
  })
);

app.use("/api", apiRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () => {
  console.log("App running");
});
