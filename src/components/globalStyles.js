import { createGlobalStyle } from "styled-components";

const scrollbarBG = "rgba(0, 0, 0, 0)";
const thumbBG = "rgba(0, 166, 255, 0.4)";
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
    height: auto;
  }
  

  button {
    font-family: ${fontFamily}
  }

  *::-webkit-scrollbar {
    width: 11px;
  }
  
  * {
    scrollbar-width: thin;
    scrollbar-color: ${thumbBG} ${scrollbarBG};
  }
  
  *::-webkit-scrollbar-track {
    background: ${scrollbarBG};
  }
  
  *::-webkit-scrollbar-thumb {
    background-color: ${thumbBG};
    /* border-radius: 6px; */
    border: 3px solid ${scrollbarBG};
  }
`;

export { GlobalStyles, fontFamily };
