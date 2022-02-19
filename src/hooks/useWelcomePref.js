import { useState } from "react";

export const useWelcomePref = (initial) => {
  const [welcomePref, _setWelcomePref] = useState(initial); // true for open

  const setWelcomePref = (val) => {
    console.log('setting cookie', val)
    document.cookie = `welcomePref=${val}; path=/`;
    _setWelcomePref(val);
  };

  return [welcomePref, setWelcomePref];
};
