import startInput from "./static/startInput";
// import axios from "axios";

// const postDump = (code, langKey) => {
//   const data = { code: code };
//   if (langKey) data.langKey = langKey;

//   return axios.post("http://127.0.0.1:8080/create", data);
// };

// /*
//   {
//     code: string
//     language: language_key
//   }
// */
// const getDump = (id) => {
//   return axios.get(`http://127.0.0.1:8080/read/${id}`);
// };

const ids = [
  "X57wdEw2jj3ZKmPa",
  "A17wdEw2jj3ZKmQw",
  "B27wdEw2jj3ZKmC1",
  "C37wdEw2jj3ZKmDb",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const postDump = (code) => {
  console.log("Dump Posted");
  return new Promise((resolve, reject) => {
    const data = {
      id: ids[getRandomInt(4)],
    };

    setTimeout(() => resolve(data), 500);
  });
};

const getDump = (id) => {
  console.log("Getting Dump");
  return new Promise((resolve, reject) => {
    const data = {
      code: startInput,
    };

    setTimeout(() => resolve(data), 500);
  });
};

export { postDump, getDump };
