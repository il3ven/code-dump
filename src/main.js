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
import { getTheme, getLangFromExt } from "./utils/utils";
import { postDump, getDump } from "./api";

// prettier-ignore
const START_INPUT = `Press Ctrl/Cmd + V or Paste something here...${"\n".repeat(15)}`;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: START_INPUT,
      codeMirrorState: new CodeMirrorState(),
      isPopupShown: false,
      currentLanguage: codeMirrorLanguages[0],
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
    try {
      const { id } = await postDump(this.state.input);
      this.props.history.push(`/${this.state.currentLanguage.ext[0]}/${id}`);
      this.setState({ isPopupShown: true });
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error(err);
      this.setState({ input: "Some error occured (•_•)" });
    }
  };

  handlePaste = async (e) => {
    const { langExt, id } = this.props.match.params;

    if (id) return;

    let clipboardData, pastedData;

    e.preventDefault();
    e.stopPropagation();

    if (langExt) {
      this.setState({ input: "Creating a link. Please wait..." });
    } else {
      this.setState({
        input: "Creating a link. Please wait...",
        currentLanguage: codeMirrorLanguages[0],
      });
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
          this.setState({ currentLanguage: langJSON });
          newUrl = `/${langJSON.ext[0]}/${id}`;
        } else {
          newUrl = `txt/${id}`;
        }
      }

      this.props.history.replace(newUrl);
      this.setState({ input: pastedData, isPopupShown: true });
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error(err);
      this.setState({ input: "Some error occured (•_•)" });
    }
  };

  handleLanguage = async (selectedOption) => {
    if (!selectedOption) return;
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

  componentDidMount = async () => {
    const { langExt, id } = this.props.match.params;

    const lang = getLangFromExt(langExt);
    if (lang) {
      this.handleLanguage(lang);
    } else {
      this.setState({ currentLanguage: codeMirrorLanguages[0] });
    }

    if (id) {
      this.setState({ input: "Getting Your Code..." });
      try {
        const code = await getDump(id);
        this.setState({ input: code });
      } catch (err) {
        console.error(err);
        this.setState({ input: "Some error occured (•_•)" });
      }
    }

    document.addEventListener("paste", this.handlePaste);
  };

  componentWillUnmount() {
    document.removeEventListener("paste", this.handlePaste);
  }

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
          handleCodeMirrorState={this.handleCodeMirrorState}
          handleLanguage={this.handleLanguage}
          handleTips={props.handleTips}
        />

        <Editor
          input={state.input}
          options={{
            lineNumbers: true,
            fixedGutter: false,
            theme: props.themeKey,
            readOnly: state.codeMirrorState.get(),
            mode: state.currentLanguage.mode,
            viewportMargin: 500,
          }}
          onBeforeChange={(input) => {
            this.setState({ input: input });
          }}
          onFocus={(editor, event) => {
            if (this.state.input === START_INPUT) {
              this.setState({ input: `${"\n".repeat(15)}` });
              editor.setCursor(0, 0);
            }
          }}
          onBlur={(editor) => {
            if (this.state.input === `${"\n".repeat(15)}`) {
              this.setState({ input: START_INPUT });
            }
          }}
        />
      </>
    );
  }
}

export default withRouter(Main);
