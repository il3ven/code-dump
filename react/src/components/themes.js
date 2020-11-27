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
    thumbBG: "#ffffff66",
    scrollBarBG: "rgba(0, 0, 0, 0)",
    inlineCode: "#e6db741c",
    codeMirrorBorder: "#dcdcdc40",
    welcome: {
      bg: "#a3a3a347",
      heading: "#e6db74",
    },
  },

  eclipse: {
    body: "#FFF",
    text: "#363537",
    background: "#363537",
    thumbBG: "rgba(0, 0, 0, 0.28)",
    scrollBarBG: "rgba(0, 0, 0, 0)",
    inlineCode: "#22119917",
    codeMirrorBorder: "#cccccc63",
    welcome: {
      bg: "#a3a3a347",
      heading: "#219",
    },
  },
};

export { themes, codeMirrorThemes };
