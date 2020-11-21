import React from "react";
import styled from "styled-components";

const ModalDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  // z-index: 100;
`;

class Modal extends React.Component {
  render() {
    return (
      <ModalDiv id="modal" onClick={this.props.handleClose}>
        {this.props.children}
      </ModalDiv>
    );
  }
}

export default Modal;
