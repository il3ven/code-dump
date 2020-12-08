import React from "react";
import styled from "styled-components";
import ToolbarButton from "./toolbarButton";
import ToolbarButtonWithModal from "./toolbarButtonWithModal";
import { codeMirrorThemes } from "./themes";
import codeMirrorLanguages from "../static/langauges.json";
import { decodeClipboardState } from "../utils/utils";

const StyledToolbar = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: rgb(65, 59, 57);
  padding: 0 5px 0;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
`;

class Toolbar extends React.Component {
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

        <ToolbarButton
          name="readOnly"
          onClick={this.props.handleCodeMirrorState}
        >
          {text.save_edit}
        </ToolbarButton>

        <ToolbarButtonWithModal
          onSubmit={this.props.handleLanguage}
          options={codeMirrorLanguages}
        >
          {text.language}
        </ToolbarButtonWithModal>

        <ToolbarButton onClick={this.props.handleClipboard}>
          {decodeClipboardState(this.props.clipboardState)}
        </ToolbarButton>

        <ToolbarButton onClick={this.props.handleTips}>Tips</ToolbarButton>
      </StyledToolbar>
    );
  }
}

export default Toolbar;
