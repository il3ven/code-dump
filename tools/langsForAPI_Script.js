const { faSadCry } = require("@fortawesome/free-solid-svg-icons");
const langs = require("../src/static/langauges.json");
const fs = require('fs');

let arr = []

langs.forEach((lang) => {
  arr.push(lang.ext[0]);
});

console.log(arr);

fs.writeFileSync("langsForAPI.json", JSON.stringify(arr));