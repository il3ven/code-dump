import React from "react";
import styled from "styled-components";

const ModalDiv = styled.div`
  position: absolute; // Changed from fix to align modal with toolbar
  width: 100%;
  height: 100vh;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  z-index: 11;
`;

class Modal extends React.Component {
  onClick = (event) => {
    if (event.target.id === "modal") {
      this.props.handleClose(event);
    }
  };
  render() {
    console.log("Modal", this.props.handleClose);
    return (
      <ModalDiv id="modal" onClick={this.onClick}>
        {this.props.children}
      </ModalDiv>
    );
  }
}

export default Modal;