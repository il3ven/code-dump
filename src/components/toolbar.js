import React from "react";
import styled from "styled-components";
import ToolbarButton from "./toolbarButton";
import ToolbarButtonWithModal from "./toolbarButtonWithModal";
import { codeMirrorThemes } from "./themes";
import codeMirrorLanguages from "../static/langauges.json";

const StyledToolbar = styled.div`
   {
    display: flex;
    justify-content: flex-start;
    background-color: rgb(65, 59, 57);
    padding: 0 5px 0;
    height: 20pt;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10;
  }
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

        <ToolbarButton name="readOnly" onClick={this.props.handleChange}>
          {this.props.readOnly ? "Edit" : "Save"}
        </ToolbarButton>

        <ToolbarButtonWithModal
          onSubmit={this.props.handleLanguageSubmit}
          options={codeMirrorLanguages}
        >
          {text.language}
        </ToolbarButtonWithModal>

        <ToolbarButton>Clipboard Access</ToolbarButton>
      </StyledToolbar>
    );
  }
}

export default Toolbar;
