import { codeMirrorThemes } from "../components/themes";
import codeMirrorLanguages from "../static/langauges.json";

const checkClipPermission = () => {
  const queryOpts = { name: "clipboard-read", allowWithoutGesture: true };
  return navigator.permissions.query(queryOpts);
};

const getTheme = (themeKey) =>
  codeMirrorThemes.find((elm) => elm.key === themeKey);

const getLangFromKey = (langKey) =>
  codeMirrorLanguages.find((elm) => elm.key === langKey);

const getLangFromExt = (langExt) =>
  codeMirrorLanguages.find((elm) => elm.ext.includes(langExt));

const decodeClipboardState = (state) => {
  if (state === "granted") {
    return "Paste & Replace";
  } else if (state === "prompt") {
    return "Grant Clipboard Access";
  } else {
    return "Clipboard Blocked";
  }
};

export {
  checkClipPermission,
  getTheme,
  getLangFromKey,
  getLangFromExt,
  decodeClipboardState,
};
