const codeMirrorThemes = [
  {
    key: "monokai",
    alias: "Monokai",
  },
  {
    key: "eclipse",
    alias: "Eclipse",
  },
];

// const themes = [
//   {
//     name: "eclipse",
//     theme: {
//       body: "#FFF",
//       text: "#363537",
//       background: "#363537",
//     },
//   },
//   {
//     name: "monokai",
//     theme: {
//       body: "#363537",
//       text: "#FAFAFA",
//       background: "#999",
//     },
//   },
// ];

const themes = {
  monokai: {
    body: "#363537",
    text: "#FAFAFA",
    background: "#999",
  },

  eclipse: {
    body: "#FFF",
    text: "#363537",
    background: "#363537",
  },
};

export { themes, codeMirrorThemes };
