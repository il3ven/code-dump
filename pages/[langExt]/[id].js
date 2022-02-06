import React, { useState } from "react";
import clientPromise from "../../lib/mongoClient";
import base64url from 'base64url'
import { ObjectId } from "mongodb";

import Main from "../../src/main";
import codeMirrorLanguages from "../../src/static/langauges.json";
import { getTheme, getLangFromExt } from "../../src/utils/utils";
import { postDump, getDump } from "../../src/api";

// prettier-ignore
const START_INPUT = `${'*'.repeat(44)}\n\n# Press Ctrl/CMD + V or Paste something here\n\n${'*'.repeat(44)}${'\n'.repeat(11)}`;

function WithInputCode(props) {
  return <Main {...props} />;
}

export const getServerSideProps = async (ctx) => {
  console.log('getServerSideProps', new Date())
  // get input from query
  const { id } = ctx.query;
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

export default WithInputCode;
