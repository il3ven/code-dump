import { useEffect, useState } from "react";
import { codeMirrorThemes } from "../components/themes";

export const useDarkMode = () => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || codeMirrorThemes[0].key
  );

  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeSetter = (theme) => {
    setMode(theme.key);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);
  return [theme, themeSetter];
};
