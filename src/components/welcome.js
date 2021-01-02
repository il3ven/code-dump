import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "react-collapse";
import { checkClipPermission, decodeClipboardState } from "../utils/utils";

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

const CollapseInfoDiv = styled.div`
  display: flex;
  align-items: center;
`;

const AccessDiv = styled.div`
  margin-bottom: 1.5rem;
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
  white-space: normal;
`;

const Button = styled.button`
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.text};
  background-color: inherit;
  border: 1px solid ${({ theme }) => theme.text};
  transition: box-shadow 0.3s ease-in-out;
  font-weight: bold;
  font-size: 11pt;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
    // box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

function CollapseInfo(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const rotation = open ? 90 : 0;

  return (
    <>
      <CollapseInfoDiv>
        <FontAwesomeIcon
          icon="caret-right"
          style={{ fontSize: "14pt", transition: "all 0.1s linear" }}
          rotation={rotation}
        />
        <FeaturesButton href="#" onClick={handleClick}>
          {props.title}
        </FeaturesButton>
      </CollapseInfoDiv>

      <Collapse isOpened={open}>
        <div style={{ margin: "0 0.72rem 0" }}>{props.children}</div>
      </Collapse>
    </>
  );
}

class Welcome extends React.Component {
  state = {
    clipboardState: "prompt",
  };

  componentDidMount = async () => {
    const status = await checkClipPermission();
    const _this = this;
    status.onchange = function () {
      _this.setState({ clipboardState: this.state });
    };
    this.setState({ clipboardState: status.state });
  };

  handleFeatures = (event) => {
    event.preventDefault();
    this.props.setFeatureOpen(!this.props.featureOpen);
  };

  tryToPaste = async () => {
    try {
      await navigator.clipboard.readText();
    } catch (err) {
      console.error("Clipboard", err);
    }
  };

  render() {
    // const rotation = this.props.featureOpen ? 90 : 0;

    return (
      <Div>
        <HeadingDiv>
          <H1>Welcome! Share code as fast as possible.</H1>
          <Button onClick={this.props.onClose}>
            <FontAwesomeIcon icon="times" style={{ margin: "0 0.3rem 0 0" }} />
            Close
          </Button>
        </HeadingDiv>

        <CollapseInfo title="What if the detected language is wrong?">
          <ol style={{ margin: "0 -0.72rem 0", fontSize: "11pt" }}>
            <li>
              In such a case just change the language from the generated URL.
            </li>
            <li>
              For example, if the generated URL is{" "}
              <InlineCode>code-dump.vercel.app/py/X-nLd-rmKh30oRzI</InlineCode>{" "}
              then to change the language from Python to JavaScript replace{" "}
              <InlineCode>py</InlineCode> with <InlineCode>js</InlineCode>. The
              new URL will be{" "}
              <InlineCode>code-dump.vercel.app/js/X-nLd-rmKh30oRzI</InlineCode>
            </li>
          </ol>
        </CollapseInfo>

        {/* <CollapseInfo title="Why do we need your clipboard acess?">
          <div style={{ margin: "0 0.72rem 0" }}>
            <Text>
              Whenever you visit our home page we will automatically create a
              shareable link of your last copied text.
            </Text>
          </div>
        </CollapseInfo> */}

        {/* <CollapseInfoDiv>
          <FontAwesomeIcon
            icon="caret-right"
            style={{ fontSize: "14pt", transition: "all 0.1s linear" }}
            rotation={rotation}
          />
          <FeaturesButton href="#" onClick={this.handleFeatures}>
            How to use?
          </FeaturesButton>
        </CollapseInfoDiv>
        <Collapse isOpened={this.props.featureOpen}>
          <div>
            <ol style={{ margin: 0, fontSize: "11pt" }}>
              <li>Grant access to clipboard.</li>
              <li>
                Visit{" "}
                <a href="www.code-dump.vercel.app" style={{ color: "inherit" }}>
                  www.code-dump.vercel.app
                </a>
              </li>
              <li>A shareable link will be automatically generated.</li>
              <li>
                We will also automatically detect the language for your code.
                This ensures proper syntax highlighting.
              </li>
              <li>
                If the language detected is wrong then just change the language
                from the generated URL.
              </li>
              <li>
                For example, if the generated URL is{" "}
                <InlineCode>
                  www.code-dump.vercel.app/py/X-nLd-rmKh30oRzI
                </InlineCode>{" "}
                then to change the language from Python to JavaScript replace{" "}
                <InlineCode>py</InlineCode> with <InlineCode>js</InlineCode>.
                The new URL will be{" "}
                <InlineCode>
                  www.code-dump.vercel.app/js/X-nLd-rmKh30oRzI
                </InlineCode>
              </li>

              <li>
                Change <InlineCode>theme</InlineCode> using the 1st button
              </li>
              <li>
                Change <InlineCode>language</InlineCode> using the 3rd button
              </li>
            </ol>
          </div>
        </Collapse> */}
      </Div>
    );
  }
}

export default Welcome;
