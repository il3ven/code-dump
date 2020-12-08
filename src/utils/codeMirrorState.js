// Toggle b/w Edit () & Save

export const CODEMIRROR_STATE_SAVE = false;
export const CODEMIRROR_STATE_EDIT = "nocursor";

/*
 * Valid states : "nocursor", false
 */
export default class CodeMirrorState {
  constructor() {
    this.state = CODEMIRROR_STATE_SAVE;
  }

  get() {
    return this.state;
  }

  toText() {
    return this.state === CODEMIRROR_STATE_SAVE ? "Save" : "Edit";
  }

  toggle() {
    this.state =
      this.state === CODEMIRROR_STATE_SAVE
        ? CODEMIRROR_STATE_EDIT
        : CODEMIRROR_STATE_SAVE;
    return this.state;
  }
}
