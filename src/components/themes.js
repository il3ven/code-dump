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
    body: "#272822",
    text: "#FAFAFA",
    background: "#999",
    thumbBG: "#ffffff66",
    scrollBarBG: "rgba(0, 0, 0, 0)",
    inlineCode: "#e6db741c",
    codeMirrorBorder: "#dcdcdc40",
    welcome: {
      bg: "#545355",
      heading: "#e6db74",
    },
    popup: {
      border: "#ffffff20",
    },
  },

  eclipse: {
    body: "#FFF",
    text: "#363537",
    background: "#363537",
    thumbBG: "rgba(0, 0, 0, 0.28)",
    scrollBarBG: "rgba(0, 0, 0, 0)",
    inlineCode: "#99111117",
    codeMirrorBorder: "#cccccc63",
    welcome: {
      bg: "#e5e5e5",
      heading: "#df2323",
    },
    popup: {
      border: "#36353715",
    },
  },
};

export { themes, codeMirrorThemes };
