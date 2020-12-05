import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "react-collapse";

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

const FeaturesDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
`;

const FeaturesButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0 0.3rem 0;
  // border: 2px solid white;
  // padding: 0.2rem 0.5rem;
  font-weight: 600;
  font-size: 11pt;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }
`;

const InlineCode = styled.pre`
  background: ${({ theme }) => theme.inlineCode};
  padding: 0 0.3rem 0;
  display: inline;
`;

const Close = styled.button``;

class Welcome extends React.Component {
  handleFeatures = (event) => {
    event.preventDefault();
    this.props.setFeatureOpen(!this.props.featureOpen);
  };

  render() {
    const rotation = this.props.featureOpen ? 90 : 0;

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
        <FeaturesDiv>
          <FontAwesomeIcon
            icon="caret-right"
            style={{ fontSize: "14pt", transition: "all 0.1s linear" }}
            rotation={rotation}
          />
          <FeaturesButton href="#" onClick={this.handleFeatures}>
            Explore more
          </FeaturesButton>
        </FeaturesDiv>
        <Collapse isOpened={this.props.featureOpen}>
          <div>
            <ol style={{ margin: 0, fontSize: "11pt" }}>
              <li>
                Change <InlineCode>theme</InlineCode> using the 1st button
              </li>
              <li>
                Change <InlineCode>language</InlineCode> using the 3rd button
              </li>
            </ol>
          </div>
        </Collapse>
      </Div>
    );
  }
}

export default Welcome;
