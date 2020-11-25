import React from "react";
import styled from "styled-components";

const Div = styled.div`
  background: ${({ theme }) => theme.welcome.bg};
  margin: 0;
  padding: 5pt;
  transition: ease 10s linear;
`;

const H1 = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.welcome.heading};
  font-size: 18pt;
  margin-bottom: 15pt;
`;

const H2 = styled.h2`
  margin: 0;
  font-size: 14pt;
`;

const HeadingDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Text = styled.p`
  margin: 1pt;
  font-size: 11pt;
`;

const Close = styled.button``;

class Welcome extends React.Component {
  render() {
    return (
      <Div>
        <HeadingDiv>
          <H1>Welcome! Share code as fast as possible.</H1>
          <Close onClick={this.props.onClose}>Close</Close>
        </HeadingDiv>
        <H2>To unlock true speed, we request your clipboard access.</H2>
        <Text>
          This helps us copy code from your clipboard and automatically create a
          link each time you visit the home page.
        </Text>
      </Div>
    );
  }
}

export default Welcome;
