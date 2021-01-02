import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";

class Editor extends React.Component {
  render() {
    return (
      <div>
        <CodeMirror
          value={this.props.input}
          options={this.props.options}
          onBeforeChange={(editor, data, value) => {
            this.props.onBeforeChange(value);
          }}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
      </div>
    );
  }
}

export default Editor;
