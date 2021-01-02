import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Link = styled.div`
  background-color: ${({ theme }) => theme.welcome.bg};
  border: 2px solid ${({ theme }) => theme.popup.border};
  display: block;
  height: 21pt;
  overflow: auto;
  white-space: nowrap;
  padding: 0 0.3rem 0;
  flex: 1;
  font-size: 11pt;
`;

const Button = styled.button`
  margin: 0.3rem;
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16pt;
  width: 1.8rem;
  color: ${({ theme }) => theme.text};

  &:hover {
  }
`;

const ShowLink = (props) => {
  const [clipboard, setClipboard] = useState("copy");

  const handleCopy = async (data) => {
    try {
      await navigator.clipboard.writeText(data);
      setClipboard("check");
      setTimeout(() => {
        setClipboard("copy");
      }, 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link>{props.url}</Link>

        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
          }}
        >
          <Button onClick={handleCopy.bind(this, props.url)}>
            <FontAwesomeIcon icon={clipboard} />
          </Button>
          <Button onClick={props.onClose}>
            <FontAwesomeIcon icon="times" />
          </Button>
        </div>
      </div>
      <Link>{"Link created and copied. Share it with others."}</Link>
    </>
  );
};

export default ShowLink;
