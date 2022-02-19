import React, { useEffect, useRef, useState } from "react";

import Editor from "./components/editor";
import Toolbar from "./components/toolbar";
import Popup from "./components/popup";
import ShowLink from "./components/showLink";

import useCodeMirrorState, {
  codeMirrorStateToText,
  CODEMIRROR_STATE_SAVE,
} from "./hooks/useCodeMirrorState";
import codeMirrorLanguages from "./static/langauges.json";
import { getTheme, getLangFromExt } from "./utils/utils";
import { postDump, getDump } from "./api";

import { useRouter, withRouter } from "next/router";

// prettier-ignore
const START_INPUT = `${'*'.repeat(44)}\n\n# Press Ctrl/CMD + V or Paste something here\n\n${'*'.repeat(44)}${'\n'.repeat(11)}`;

function Main(props) {
  const router = useRouter();
  const [input, setInput] = useState(props.input || START_INPUT);
  const [codeMirrorState, codeMirrorStateToggle] = useCodeMirrorState();
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    codeMirrorLanguages[0]
  );

  const handleCodeMirrorState = () => {
    if (codeMirrorState === CODEMIRROR_STATE_SAVE) {
      handleSaveDump();
    }

    codeMirrorStateToggle();
  };

  const handleSaveDump = async () => {
    try {
      const { id } = await postDump(input);
      router.replace(`/${currentLanguage.ext[0]}/${id}`, undefined, {
        shallow: true,
      });
      setIsPopupShown(true);
      //   await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error(err);
      setInput("Some error occured (•_•)");
    }
  };

  const handleLanguage = async (selectedOption) => {
    if (!selectedOption) return;
    if (selectedOption.key !== "null") {
      await import(
        `codemirror/mode/${selectedOption.key}/${selectedOption.key}.js`
      );
    }

    const query = router.query.params ?? [];
    const [langExt, id] = query;

    if (langExt && id)
      router.replace(`/${selectedOption.ext[0]}/${id}`, undefined, {
        shallow: true,
      });
    else if (langExt)
      router.replace(`/${selectedOption.ext[0]}`, undefined, { shallow: true });

    setCurrentLanguage(selectedOption);
  };

  const _handlePaste = async (e) => {
    const query = router.query.params ?? [];
    const [langExt, id] = query;
    let clipboardData, pastedData;
    console.log('handlePaste', langExt, id)
    
    if (id) return;

    e.preventDefault();
    e.stopPropagation();

    setInput("Creating a link. Please wait...");

    if (!langExt) {
      setCurrentLanguage(codeMirrorLanguages[0]);
    }

    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData("Text");

    try {
      const { id, language, relevance } = await postDump(pastedData);
      if (!id) throw new Error("Error in Post Dump API");

      let newUrl;
      if (langExt) {
        newUrl = `/${langExt}/${id}`;
      } else {
        if (relevance > 5) {
          const langJSON = getLangFromExt(language);
          await import(`codemirror/mode/${langJSON.key}/${langJSON.key}.js`);
          setCurrentLanguage(langJSON);
          newUrl = `/${langJSON.ext[0]}/${id}`;
        } else {
          newUrl = `${codeMirrorLanguages[0].ext[0]}/${id}`;
        }
      }

      router.push(newUrl, undefined, { shallow: true });
      setInput(pastedData);
      setIsPopupShown(true);
      //   await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error(err);
      setInput("Some error occured (•_•)");
    }
  };

  // due to closure, we get stale values for router.query.params
  const handlePaste = useRef(_handlePaste);
  handlePaste.current = _handlePaste;

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query.params ?? [];
    const [langExt, id] = query;

    const lang = getLangFromExt(langExt);
    if (lang) {
      handleLanguage(lang);
    } else {
      setCurrentLanguage(codeMirrorLanguages[0]);
    }

    document.addEventListener("paste", (e) => handlePaste.current(e));

    return () => {
      document.removeEventListener("paste", (e) => handlePaste.current(e));
    };
  }, [router.isReady]);

  let url;

  if (typeof window !== "undefined") {
    url = window.location.href;
  }

  return (
    <>
      <Popup isShown={isPopupShown}>
        <ShowLink
          onClose={() => {
            setIsPopupShown(!isPopupShown);
          }}
          url={url}
        ></ShowLink>
      </Popup>

      <Toolbar
        text={{
          save_edit: codeMirrorStateToText(codeMirrorState),
          theme: getTheme(props.themeKey).alias,
          language: currentLanguage.alias,
        }}
        themeSetter={props.themeSetter}
        handleCodeMirrorState={handleCodeMirrorState}
        handleLanguage={handleLanguage}
        handleTips={props.handleTips}
      />

      {typeof window !== "undefined" ? (
        <Editor
          input={input}
          options={{
            lineNumbers: true,
            fixedGutter: false,
            theme: props.themeKey,
            readOnly: codeMirrorState,
            mode: currentLanguage.mode,
            viewportMargin: 500,
          }}
          onBeforeChange={setInput}
          onFocus={(editor, event) => {
            setInput((input) =>
              input === START_INPUT
                ? (setInput(`${"\n".repeat(15)}`), editor.setCursor(0, 0))
                : input
            );
          }}
          onBlur={(editor) => {
            setInput((input) =>
              input === `${"\n".repeat(15)}` ? START_INPUT : input
            );
          }}
        />
      ) : (
        <pre>
          <code>{input}</code>
        </pre>
      )}
    </>
  );
}

export default Main;
