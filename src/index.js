import React, { useState } from "react";
import ReactDOM from "react-dom";

import Editor from "./components/editor";
import Toolbar from "./components/toolbar";

import reportWebVitals from "./reportWebVitals";

import codeMirrorLanguages from "./static/langauges.json";
import startInput from "./static/startInput";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { themes, codeMirrorThemes } from "./components/themes";
import { useDarkMode } from "./components/useDarkMode";

const getTheme = (themeKey) =>
  codeMirrorThemes.find((elm) => elm.key === themeKey);

const getLang = (langKey) =>
  codeMirrorLanguages.find((elm) => elm.key === langKey);

const mockGetData = () => {
  return new Promise((resolve, reject) => {
    const data = {
      langauge: "javascript",
      code: startInput,
    };
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};

const App = () => {
  const [input, setInput] = useState("Fetching Code...");
  const [readOnly, setReadOnly] = useState(false);
  const [themeKey, themeSetter] = useDarkMode();
  const [currentLanguage, setCurrentLanguage] = useState({
    key: null,
    alias: null,
  });

  const handleInputChange = (newInput) => {
    setInput(newInput);
  };

  const handleChange = (event) => {
    if (event.target.name === "readOnly") {
      setReadOnly(!readOnly);
    }
  };

  const handleLanguageSubmit = async (selectedOption) => {
    await import(
      `codemirror/mode/${selectedOption.key}/${selectedOption.key}.js`
    );
    setCurrentLanguage(selectedOption);
  };

  // import(`codemirror/mode/${currentLanguage.key}/${currentLanguage.key}.js`);

  useEffect(() => {
    const fetchData = async () => {
      const data = await mockGetData();
      const lang = getLang(data.langauge);
      await import(`codemirror/mode/${lang.key}/${lang.key}.js`);
      setInput(data.code);
      setCurrentLanguage(lang);
    };

    fetchData();
  }, []);

  const _readOnly = readOnly ? "nocursor" : false;

  return (
    <ThemeProvider theme={themes[themeKey]}>
      <GlobalStyles />
      <Toolbar
        handleChange={handleChange}
        text={{
          theme: getTheme(themeKey).alias,
          language: currentLanguage.alias,
        }}
        readOnly={_readOnly}
        themeSetter={themeSetter}
        handleLanguageSubmit={handleLanguageSubmit}
      ></Toolbar>
      <Editor
        input={input}
        options={{
          lineNumbers: true,
          fixedGutter: false,
          theme: themeKey,
          readOnly: _readOnly,
          mode: currentLanguage.key,
        }}
        onBeforeChange={handleInputChange}
      />
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
