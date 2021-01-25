require("dotenv").config(); // Handled by vercel
const express = require("express");

const router = express.Router();

const cron = require("node-cron");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const url = require("url");
const { default: base64url } = require("base64url");
const hljs = require("highlight.js");
const langs = require("../tools/langsForAPI.json");

// let count = 0;

router.use(express.json());

router.use((req, res, next) => {
  // console.log("Process env variable is ", process.env.totalcount);
  let val = parseInt(process.env.totalcount);
  process.env.totalcount = val + 1;
  // console.log("env variable updated", process.env.totalcount);
  next();
});

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = {};
}

async function connectToDB(uri) {
  if (cached.conn) {
    return cached.conn;
  }

  console.log("DB not cached; Connecting");

  if (!cached.promise) {
    const conn = {};

    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(uri, opts)
      .then((client) => {
        conn.client = client;

        return client.db(url.parse(uri).pathname.substr(1));
      })
      .then((db) => {
        conn.db = db;

        cached.conn = conn;
      });
  }

  await cached.promise;

  return cached.conn;
}

router.post("/create", async (req, res) => {
  try {
    const { db } = await connectToDB(process.env.mongourl);

    const pasteDocument = { content: req.body.code };
    if (pasteDocument) {
      const { language, relevance } = hljs.highlightAuto(
        pasteDocument.content,
        langs
      );
      console.log(language, relevance);
      const pastesCollection = await db.collection("pastes");

      const result = await pastesCollection.insertOne(pasteDocument);

      const idBuffer = Buffer.from(result.insertedId.toString(), "hex");
      const idBase64 = idBuffer.toString("base64");
      const idBase64url = base64url.fromBase64(idBase64);
      const json = {
        id: idBase64url,
        language: language,
        relevance: relevance,
      };

      res.json(json);
    }
  } catch (err) {
    console.log("There is an error in creating document", err);
    res.status(500).send(err);
  }
});

router.get("/read/:id", async (req, res) => {
  try {
    const { db } = await connectToDB(process.env.mongourl);

    const idBase64 = base64url.toBase64(req.params.id);
    const readid = Buffer.from(idBase64, "base64").toString("hex");

    const pastesCollection = await db.collection("pastes");
    const paste = await pastesCollection.findOne({
      _id: ObjectId(readid),
    });

    if (paste.content) {
      res.setHeader(
        "Cache-Control",
        "max-age=31536000, s-max-age=31536000, public"
      );
      res.send(paste);
    }
  } catch (err) {
    console.error("Error in retrieving document", err);
    res.status(500).send(err);
  }
});

cron.schedule("1440 * * * * *", async () => {
  console.log("scheduler is running");
  // console.log("value of our new value count is", count);
  console.log("Value of Total count is ", process.env.totalcount);
  try {
    const { db } = await connectToDB(process.env.mongourl);
    const analytics = await db.collection("analytics");
    const obj = { count: process.env.totalcount, createdAT: Date.now() };
    const doc = await analytics.insertOne(obj);
    // count = 0;
    process.env.totalcount = 0;
  } catch (err) {
    console.log("Some Error Occured while scheduling the job");
  }
});

module.exports = router;
