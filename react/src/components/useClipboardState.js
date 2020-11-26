import { useEffect, useState } from "react";
import { checkClipPermission } from "../utils";

export const useClipboardState = () => {
  const [clipboardState, _setClipboardState] = useState("prompt");

  useEffect(() => {
    setClipboardState();
  }, []);

  const setClipboardState = async () => {
    const state = (await checkClipPermission()).state;
    _setClipboardState(state);
  };

  return [clipboardState, setClipboardState];
};
