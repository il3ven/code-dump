import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Editor from "./Editor/editor";
import Toolbar from "./Toolbar/toolbar";
import reportWebVitals from "./reportWebVitals";

class Form extends React.Component {
  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.props.handleSubmit(event);
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    return (
      <form>
        <input type="text" onesc></input>
        <input type="submit" onClick={this.props.handleSubmit}></input>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "function myScript(){console.log('Hello');}",
      darkTheme: true,
      readOnly: false,
      showInput: false,
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
        showInput: !state.showInput,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((state, props) => ({
      showInput: !state.showInput,
    }));
  };

  render() {
    console.log(this.state);

    const theme = this.state.darkTheme ? "monokai" : "eclipse";
    const readOnly = this.state.readOnly ? "nocursor" : false;

    return (
      <>
        {this.state.showInput && (
          <div className="form">
            <Form handleSubmit={this.handleSubmit}></Form>
          </div>
        )}
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
        <Toolbar
          handleChange={this.handleChange}
          darkTheme={this.state.darkTheme}
          readOnly={this.state.readOnly}
        ></Toolbar>
      </>
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
