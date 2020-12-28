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
          Theme: {text.theme}
        </ToolbarButtonWithModal>

        <ToolbarButtonWithModal
          onSubmit={this.props.handleLanguage}
          options={codeMirrorLanguages}
        >
          Lang: {text.language}
        </ToolbarButtonWithModal>

        <ToolbarButton
          name="readOnly"
          onClick={this.props.handleCodeMirrorState}
        >
          {text.save_edit}
        </ToolbarButton>

        <ToolbarButton onClick={this.props.handleTips}>Help</ToolbarButton>
      </StyledToolbar>
    );
  }
}

export default Toolbar;
