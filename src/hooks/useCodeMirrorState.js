import { useState } from "react";

export const CODEMIRROR_STATE_SAVE = false;
export const CODEMIRROR_STATE_EDIT = "nocursor";

export const codeMirrorStateToText = (codeMirrorState) => {
  return codeMirrorState === CODEMIRROR_STATE_SAVE ? "Save" : "Edit";
};

/*
 * A hook to toggle between CodeMirror states
 *
 * Valid states : "nocursor", false
 */
export default function useCodeMirrorState() {
  const [codeMirrorState, setCodeMirrorState] = useState(CODEMIRROR_STATE_SAVE);

  const toggle = () => {
    setCodeMirrorState(
      codeMirrorState === CODEMIRROR_STATE_SAVE
        ? CODEMIRROR_STATE_EDIT
        : CODEMIRROR_STATE_SAVE
    );
  };

  return [codeMirrorState, toggle];
}
