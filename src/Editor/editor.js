import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/eclipse.css";
import "./editor.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  handleButton = () => {
    const theme =
      this.state.options.theme === "monokai" ? "eclipse" : "monokai";
    this.setState({ options: { theme: theme } });
  };

  render() {
    return (
      <div>
        <CodeMirror
          value={this.props.input}
          options={this.props.options}
          onBeforeChange={(editor, data, value) => {
            this.props.onBeforeChange(value);
          }}
        />
      </div>
    );
  }
}

export default Editor;
