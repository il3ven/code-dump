import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Editor from "./Editor/editor";
import Toolbar from "./Toolbar/toolbar";
import reportWebVitals from "./reportWebVitals";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "function myScript(){console.log('Hello');}",
      options: {
        theme: "monokai",
        lineNumbers: true,
        readOnly: "nocursor",
      },
    };
  }

  handleInputChange = (newInput) => {
    this.setState({ input: newInput });
  };

  handleChange = (event) => {
    if (event.target.name === "changeTheme") {
      const theme =
        this.state.options.theme === "monokai" ? "eclipse" : "monokai";
      this.setState({ options: { theme: theme } });
    } else if (event.target.name === "toggleEdit") {
      const readOnly =
        this.state.options.readOnly === "nocursor" ? false : "nocursor";
      this.setState({ options: { readOnly: readOnly } });
    }
  };

  render() {
    return (
      <div>
        <Editor
          input={this.state.input}
          options={this.state.options}
          onBeforeChange={this.handleInputChange}
        />
        <Toolbar handleChange={this.handleChange}></Toolbar>
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
