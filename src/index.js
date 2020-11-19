import React from "react";
import ReactDOM from "react-dom";

import Editor from "./Editor/editor";
import Toolbar from "./Toolbar/toolbar";
import Modal from "./Modal/modal";
import { InputBar } from "./Input/input";

import reportWebVitals from "./reportWebVitals";

import codeMirrorLanguages from "./static/langauges.json";
import startInput from "./static/startInput";
import styles from "./index.module.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: startInput,
      darkTheme: true,
      readOnly: false,
      showInput: false,
      currentLanguage: codeMirrorLanguages[0],
    };
  }

  handleInputChange = (newInput) => {
    this.setState({ input: newInput });
  };

  handleChange = (event) => {
    const state = this.state;

    if (event.target.name === "darkTheme") {
      this.setState({
        darkTheme: !state.darkTheme,
      });
    } else if (event.target.name === "readOnly") {
      this.setState({
        readOnly: !state.readOnly,
      });
    } else if (event.target.name === "language") {
      this.setState({
        showInput: !state.showInput,
      });
    }
  };

  handleLanguageSubmit = (selectedOption) => {
    this.setState((state, props) => ({
      showInput: !state.showInput,
      currentLanguage: selectedOption,
    }));
  };

  handleModalClose = (event) => {
    if (event.target.className === "modal") {
      this.setState((state, props) => ({
        showInput: !state.showInput,
      }));
    }
  };

  render() {
    // console.log(this.state);

    const theme = this.state.darkTheme ? "monokai" : "eclipse";
    const readOnly = this.state.readOnly ? "nocursor" : false;

    return (
      <div className={styles.app}>
        {this.state.showInput && (
          <Modal handleClose={this.handleModalClose}>
            <InputBar
              handleSubmit={this.handleLanguageSubmit}
              options={codeMirrorLanguages}
            ></InputBar>
          </Modal>
        )}
        <Toolbar
          handleChange={this.handleChange}
          darkTheme={this.state.darkTheme}
          readOnly={this.state.readOnly}
          currentLanguage={this.state.currentLanguage}
        ></Toolbar>
        <Editor
          input={this.state.input}
          options={{
            lineNumbers: true,
            fixedGutter: false,
            theme: theme,
            readOnly: readOnly,
          }}
          onBeforeChange={this.handleInputChange}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
