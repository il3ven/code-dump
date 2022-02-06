import React from "react";
import dynamic from "next/dynamic";

const CodeMirror = dynamic(
  async () => {
    await import("codemirror/lib/codemirror.css");
    await import("codemirror/theme/monokai.css");
    await import("codemirror/theme/eclipse.css");
    await import("codemirror/mode/markdown/markdown.js"); // Add this only if the default lang is markdown
    return (await import("react-codemirror2")).Controlled;
  },
  {
    ssr: false,
  }
);

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
