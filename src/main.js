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
    const { id } = await postDump(this.state.input);
    this.props.history.push(`/${this.state.currentLanguage.ext[0]}/${id}`);
    this.setState({ isPopupShown: true });
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
    const status = await checkClipPermission();

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
    } else {
      if (status.state === "granted") {
        this.setState({ input: "Creating a link. Please wait..." });
        try {
          const text = await navigator.clipboard.readText();
          const { id, language, relevance } = await postDump(text);
          if (!id) throw new Error("Error in Post Dump API");
          let newUrl;
          if (langExt) {
            newUrl = `/${langExt}/${id}`;
          } else {
            if (relevance > 5) {
              const langJSON = getLangFromExt(language);
              console.log(langJSON);
              await import(
                `codemirror/mode/${langJSON.key}/${langJSON.key}.js`
              );
              this.setState({ currentLanguage: langJSON });
              newUrl = `/${langJSON.ext[0]}/${id}`;
            } else {
              newUrl = `txt/${id}`;
            }
          }
          this.props.history.replace(newUrl);
          this.setState({
            input: text,
            isPopupShown: true,
          });
        } catch (err) {
          console.error(err);
          this.setState({ input: "Some error occured (•_•)" });
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
        />
      </>
    );
  }
}

export default withRouter(Main);
