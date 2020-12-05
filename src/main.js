import React, { useEffect, useState } from "react";
import {
  generatePath,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import Editor from "./components/editor";
import Toolbar from "./components/toolbar";

import codeMirrorLanguages from "./static/langauges.json";
import { codeMirrorThemes } from "./components/themes";
import { useClipboardState } from "./components/useClipboardState";
import { checkClipPermission } from "./utils";
import { postDump, getDump } from "./api";

const getTheme = (themeKey) =>
  codeMirrorThemes.find((elm) => elm.key === themeKey);

const getLangFromKey = (langKey) =>
  codeMirrorLanguages.find((elm) => elm.key === langKey);

const getLangFromExt = (langExt) =>
  codeMirrorLanguages.find((elm) => elm.ext.includes(langExt));

const Main = (props) => {
  const [clipboardState, setClipboardState] = useClipboardState();
  const [input, setInput] = useState(
    `Type/Paste something here then click Save...${"\n".repeat(15)}`
  );
  const [readOnly, setReadOnly] = useState(false);
  const { langExt, id } = useParams();
  const history = useHistory();
  const match = useRouteMatch();
  const [currentLanguage, setCurrentLanguage] = useState(
    codeMirrorLanguages[0]
  );

  const handleInputChange = (newInput) => {
    setInput(newInput);
  };

  const handleChange = async (event) => {
    if (event.target.name === "readOnly") {
      setReadOnly(!readOnly);
      if (!readOnly) {
        const ret = await postDump(input);
        history.push(`/${currentLanguage.ext[0]}/${ret.data.id}`);
      }
    }
  };

  const handleLanguageSubmit = async (selectedOption) => {
    if (selectedOption.key !== "null") {
      await import(
        `codemirror/mode/${selectedOption.key}/${selectedOption.key}.js`
      );
    }
    setCurrentLanguage(selectedOption);
    const path = generatePath(match.path, {
      langExt: selectedOption.ext[0],
      id: id,
    });
    history.replace(path);
  };

  const handleClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInput(text);
    } catch (err) {
      // setInput(err.toString());
    } finally {
      setClipboardState();
    }
  };

  useEffect(() => {
    const handleGetState = async () => {
      const res = await getDump(id);
      setInput(res.data.content);
    };

    const handleSaveState = async () => {
      try {
        const state = (await checkClipPermission()).state;
        if (state === "granted") {
          const text = await navigator.clipboard.readText();
          const ret = await postDump(text);
          console.log(ret);
          setInput(text);
          const newUrl = langExt ? `/${langExt}/${ret.data.id}` : `/txt/${ret.data.id}`;
          history.push(newUrl);
        }
      } catch (err) {
        setInput(err.toString());
      }
    };

    const lang = getLangFromExt(langExt);
    if (lang) {
      handleLanguageSubmit(lang);
    } else {
      setCurrentLanguage(codeMirrorLanguages[0]);
    }

    if (id) {
      handleGetState();
    } else {
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
        handleTips={props.handleTips}
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
