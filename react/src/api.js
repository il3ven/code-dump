import axios from "axios";

const postDump = (content) => {
  return axios.post("https://ovpce.sse.codesandbox.io/create", {
    content: content,
  });
};

export { postDump };
