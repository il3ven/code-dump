import axios from "axios";

const postDump = (code, langKey) => {
  const data = { code: code };
  if (langKey) data.langKey = langKey;

  return axios.post("http://127.0.0.1:8080/create", data);
};

/* 
  {
    code: string
    language: language_key
  }
*/
const getDump = (id) => {
  return axios.get(`http://127.0.0.1:8080/read/${id}`);
};

export { postDump, getDump };
