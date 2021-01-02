import { useEffect, useState } from "react";

export const useWelcomePref = () => {
  const [welcomePref, _setWelcomePref] = useState(
    window.localStorage.getItem("welcomePref") === "true"
  ); // true for open

  const setWelcomePref = (val) => {
    window.localStorage.setItem("welcomePref", val);
    _setWelcomePref(val);
  };

  useEffect(() => {
    const localWelcomePref =
      window.localStorage.getItem("welcomePref") === "true";
    localWelcomePref && _setWelcomePref(localWelcomePref);
  }, []);

  return [welcomePref, setWelcomePref];
};
