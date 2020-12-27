import { useEffect, useState } from "react";
import { checkClipPermission } from "../utils/utils";

export const useClipboardState = () => {
  const [clipboardState, _setClipboardState] = useState("prompt");

  useEffect(() => {
    const func = async () => {
      const status = await checkClipPermission();
      status.onchange = function () {
        _setClipboardState(this.state);
      };
      setClipboardState();
    };

    func();
  }, []);

  const setClipboardState = async () => {
    const state = (await checkClipPermission()).state;
    _setClipboardState(state);
  };

  return [clipboardState, setClipboardState];
};
