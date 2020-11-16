import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/eclipse.css";

class App extends React.Component {
  // componentDidMount() {
  //   const editor = document.getElementById("editor");

  //   var myCodeMirror = CodeMirror(
  //     function (elt) {
  //       editor.parentNode.replaceChild(elt, editor);
  //     },
  //     { lineNumbers: true, value: editor.value, mode: "javascript" }
  //   );
  // }

  constructor(props) {
    super(props);
    this.state = {
      value: "function myScript(){console.log('Hello');}",
      options: {
        theme: "monokai",
      },
    };
  }

  handleButton = () => {
    const theme =
      this.state.options.theme === "monokai" ? "eclipse" : "monokai";
    this.setState({ options: { theme: theme } });
    console.log("Handle Button");
  };

  render() {
    console.log(this.state.value);

    return (
      <div>
        <CodeMirror
          value={this.state.value}
          options={this.state.options}
          onBeforeChange={(editor, data, value) => {
            this.setState({ value });
          }}
          onChange={(editor, data, value) => {}}
        />
        <button onClick={this.handleButton}>Change Theme</button>
      </div>
    );
  }
}

export default App;
