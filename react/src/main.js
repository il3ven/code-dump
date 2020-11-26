import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Editor from "./components/editor";
import Toolbar from "./components/toolbar";

import codeMirrorLanguages from "./static/langauges.json";
import startInput from "./static/startInput";
import { codeMirrorThemes } from "./components/themes";
import { useClipboardState } from "./components/useClipboardState";
import { checkClipPermission } from "./utils";
import { postDump } from "./api";

const getTheme = (themeKey) =>
  codeMirrorThemes.find((elm) => elm.key === themeKey);

const getLang = (langKey) =>
  codeMirrorLanguages.find((elm) => elm.key === langKey);

const mockGetData = () => {
  return new Promise((resolve, reject) => {
    const data = {
      id: "a23h8ko0",
      langauge: "javascript",
      code: startInput,
    };
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};

const Main = (props) => {
  const [clipboardState, setClipboardState] = useClipboardState();
  const [input, setInput] = useState("Fetching Code...");
  const [readOnly, setReadOnly] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    key: null,
    alias: "Plain Text",
  });
  const history = useHistory();

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

  const handleClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      setInput(err.toString());
    } finally {
      setClipboardState();
    }
  };

  useEffect(() => {
    const handleGetState = async () => {
      const data = await mockGetData();
      const lang = getLang(data.langauge);
      await import(`codemirror/mode/${lang.key}/${lang.key}.js`);
      setInput(data.code);
      setCurrentLanguage(lang);
    };

    const handleSaveState = async () => {
      let text;
      try {
        const state = (await checkClipPermission()).state;
        if (state === "granted") {
          text = await navigator.clipboard.readText();
          // history.replace(`/get/Abh1Bhs2`);
        } else {
          text = "Grant Access";
        }
      } catch (err) {
        text = err.toString();
      } finally {
        setInput(text);
        const ret = await postDump(text);
        console.log(ret);
      }
    };

    if (props.state === "get") {
      handleGetState();
    } else if (props.state === "save") {
      handleSaveState();
    }
  }, []);

  const _readOnly = readOnly ? "nocursor" : false;

  return (
    <>
      <Toolbar
        handleChange={handleChange}
        text={{
          theme: getTheme(props.themeKey).alias,
          language: currentLanguage.alias,
        }}
        readOnly={_readOnly}
        themeSetter={props.themeSetter}
        handleLanguageSubmit={handleLanguageSubmit}
        clipboardState={clipboardState}
        handleClipboard={handleClipboard}
      ></Toolbar>
      <Editor
        input={input}
        options={{
          lineNumbers: true,
          fixedGutter: false,
          theme: props.themeKey,
          readOnly: _readOnly,
          mode: currentLanguage.key,
          viewportMargin: 500,
        }}
        onBeforeChange={handleInputChange}
      />
    </>
  );
};

export default Main;
