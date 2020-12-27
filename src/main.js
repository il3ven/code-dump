import React from "react";
import { generatePath, withRouter } from "react-router-dom";
import CodeMirrorState, {
  CODEMIRROR_STATE_SAVE,
} from "./utils/codeMirrorState";

import Editor from "./components/editor";
import Toolbar from "./components/toolbar";
import Popup from "./components/popup";
import ShowLink from "./components/showLink";

import codeMirrorLanguages from "./static/langauges.json";
import { checkClipPermission, getTheme, getLangFromExt } from "./utils/utils";
import { postDump, getDump } from "./api";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: `Type/Paste something here then click Save...${"\n".repeat(15)}`,
      codeMirrorState: new CodeMirrorState(),
      isPopupShown: false,
      currentLanguage: codeMirrorLanguages[0],
      clipboardState: "prompt",
    };
  }

  handleCodeMirrorState = () => {
    const codeMirrorState = this.state.codeMirrorState;

    if (codeMirrorState.get() === CODEMIRROR_STATE_SAVE) {
      this.handleSaveDump();
    }

    codeMirrorState.toggle();
    this.setState({ codeMirrorState: codeMirrorState });
  };

  handleSaveDump = async () => {
    const newID = await postDump(this.state.input);
    this.props.history.push(`/${this.state.currentLanguage.ext[0]}/${newID}`);
    this.setState({ isPopupShown: true });
  };

  handleLanguage = async (selectedOption) => {
    if (selectedOption.key !== "null") {
      await import(
        `codemirror/mode/${selectedOption.key}/${selectedOption.key}.js`
      );
    }
    const path = generatePath(this.props.match.path, {
      langExt: selectedOption.ext[0],
      id: this.props.match.params.id,
    });
    this.props.history.replace(path);
    this.setState({ currentLanguage: selectedOption });
  };

  tryToPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) this.setState({ input: text });
    } catch (err) {
      console.log("Clipboard", err);
    }
  };

  componentDidMount = async () => {
    const status = await checkClipPermission();
    const _this = this;
    status.onchange = function () {
      _this.setState({ clipboardState: this.state });
    };
    this.setState({ clipboardState: status.state });

    const { langExt, id } = this.props.match.params;

    const lang = getLangFromExt(langExt);
    if (lang) {
      this.handleLanguage(lang);
    } else {
      this.setState({ currentLanguage: codeMirrorLanguages[0] });
    }

    if (id) {
      this.setState({ input: "Getting Your Code..." });
      const code = await getDump(id);
      this.setState({ input: code });
    } else {
      if (status.state === "granted") {
        try {
          const text = await navigator.clipboard.readText();
          const newID = await postDump(text);
          let newUrl;
          if (langExt) {
            newUrl = `/${langExt}/${newID}`;
          } else {
            newUrl = `/txt/${newID}`;
          }
          this.props.history.replace(newUrl);
          this.setState({
            input: text,
            isPopupShown: true,
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  render() {
    const state = this.state;
    const props = this.props;

    return (
      <>
        <Popup isShown={state.isPopupShown}>
          <ShowLink
            onClose={() => {
              this.setState({ isPopupShown: !state.isPopupShown });
            }}
            url={window.location.href}
          ></ShowLink>
        </Popup>

        <Toolbar
          text={{
            save_edit: state.codeMirrorState.toText(),
            theme: getTheme(props.themeKey).alias,
            language: state.currentLanguage.alias,
          }}
          themeSetter={props.themeSetter}
          clipboardState={state.clipboardState}
          handleCodeMirrorState={this.handleCodeMirrorState}
          handleLanguage={this.handleLanguage}
          handleClipboard={this.tryToPaste}
          handleTips={props.handleTips}
        />

        <Editor
          input={state.input}
          options={{
            lineNumbers: true,
            fixedGutter: false,
            theme: props.themeKey,
            readOnly: state.codeMirrorState.get(),
            mode: state.currentLanguage.key,
            viewportMargin: 500,
          }}
          onBeforeChange={(input) => {
            this.setState({ input: input });
          }}
        />
      </>
    );
  }
}

export default withRouter(Main);
