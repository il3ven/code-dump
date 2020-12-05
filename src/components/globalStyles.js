import { createGlobalStyle } from "styled-components";

// const scrollBarBG = "rgba(0, 0, 0, 0)";
// const thumbBG = "rgba(0, 166, 255, 0.4)";
const fontFamily = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;`;

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: ${fontFamily};
    // transition: all 0.50s linear;
  }

  .CodeMirror {
    // height: calc(100vh - 20pt);
    height: auto;
    border-bottom: 1px solid ${({ theme }) => theme.codeMirrorBorder};
  }
  
  .ReactCollapse--collapse {
    transition: height 500ms;
  }

  button {
    font-family: ${fontFamily}
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler{
    background: ${({ theme }) => theme.scrollBarBG};
    // border: 3px solid red;
  }
  
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.thumbBG} ${({ theme }) =>
  theme.scrollBarBG};
  }
  
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollBarBG};
  }
  
  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.thumbBG};
    /* border-radius: 6px; */
    border: 3px solid ${({ theme }) => theme.scrollBarBG};
  }
`;

export { GlobalStyles, fontFamily };
