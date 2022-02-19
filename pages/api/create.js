import clientPromise from "../../lib/mongoClient";
import base64url from "base64url";
import hljs from "highlight.js";

import langs from "../../tools/langsForAPI.json";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db()

    const pasteDocument = { content: req.body.code };
    if (pasteDocument) {
      const { language, relevance } = hljs.highlightAuto(
        pasteDocument.content,
        langs
      );
      console.log(language, relevance);
      const pastesCollection = db.collection("pastes");

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
}
