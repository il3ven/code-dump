import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  max-width: 30rem;
  bottom: 10%;
  right: 50%;
  z-index: 10;
  transform: translate(50%);
  // background-color: ${({ theme }) => theme.popup.bg};
  animation: slidein 1s ease;

  @keyframes slidein {
    from {
      opacity: 0;
      bottom: 8%;
    }

    to {
      opacity: 1;
      bottom: 10%;
    }
  }
`;

class Popup extends React.Component {
  render() {
    if (!this.props.isShown) {
      return <></>;
    }
    return (
      <Container onClick={this.props.onClose}>{this.props.children}</Container>
    );
  }
}

export default Popup;
