import React from "react";
import styled from "styled-components";
import ToolbarButton from "./toolbarButton";
import ToolbarButtonWithModal from "./toolbarButtonWithModal";
import { codeMirrorThemes } from "./themes";
import codeMirrorLanguages from "../static/langauges.json";

const StyledToolbar = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  background-color: rgb(65, 59, 57);
  padding: 0 5px 0;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
`;

class Toolbar extends React.Component {
  decodeClipboardState(state) {
    if (this.props.clipboardState === "granted") {
      return "Paste & Replace";
    } else if (this.props.clipboardState === "prompt") {
      return "Grant Clipboard Access";
    } else {
      return "Clipboard Blocked";
    }
  }

  render() {
    const text = this.props.text;

    return (
      <StyledToolbar>
        <ToolbarButtonWithModal
          onSubmit={this.props.themeSetter}
          options={codeMirrorThemes}
        >
          {text.theme}
        </ToolbarButtonWithModal>

        <ToolbarButton name="readOnly" onClick={this.props.handleChange}>
          {this.props.readOnly ? "Edit" : "Save"}
        </ToolbarButton>

        <ToolbarButtonWithModal
          onSubmit={this.props.handleLanguageSubmit}
          options={codeMirrorLanguages}
        >
          {text.language}
        </ToolbarButtonWithModal>

        <ToolbarButton onClick={this.props.handleClipboard}>
          {this.decodeClipboardState(this.props.clipboardState)}
        </ToolbarButton>
      </StyledToolbar>
    );
  }
}

export default Toolbar;
