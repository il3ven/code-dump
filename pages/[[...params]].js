import Main from "../src/main";
import clientPromise from "../lib/mongoClient";
import base64url from 'base64url'
import { ObjectId } from "mongodb";

export const getServerSideProps = async (ctx) => {
  // get input from query
  const query = ctx.query.params ?? [];
  const [ lang, id ] = query;
  console.log("getServerSideProps", new Date(), id);
  if (!id)
    return {
      props: {},
    };
  const { res } = ctx;

  try {
    const client = await clientPromise;
    const db = client.db();

    const idBase64 = base64url.toBase64(id);
    const readid = Buffer.from(idBase64, "base64").toString("hex");

    const pastesCollection = db.collection("pastes");
    const paste = await pastesCollection.findOne({
      _id: ObjectId(readid),
    });

    if (!paste.content) {
      throw new Error("Paste not found");
    }

    res.setHeader(
      "Cache-Control",
      "max-age=31536000, s-max-age=31536000, public"
    );

    return {
      props: {
        input: paste.content,
      },
    };
  } catch (err) {
    console.error("Error in retrieving document", err);
    return {
      props: {
        input: "Some error occured (•_•)",
      },
    };
  }
};

export default Main;
