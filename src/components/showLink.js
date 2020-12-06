import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Link = styled.div`
  background-color: ${({ theme }) => theme.welcome.bg};
  border: 2px solid ${({ theme }) => theme.popup.border};
  display: block;
  height: 25pt;
  overflow: auto;
  white-space: nowrap;
  padding: 0 0.3rem 0;
  flex: 1;
`;

const Button = styled.button`
  margin: 0.3rem;
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 17pt;
  color: ${({ theme }) => theme.text};

  &:hover {
  }
`;

const handleCopy = async (data) => {
  try {
    await navigator.clipboard.writeText(data);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const ShowLink = (props) => {
  return (
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
          <FontAwesomeIcon icon="copy" />
        </Button>
        <Button onClick={props.onClose}>
          <FontAwesomeIcon icon="times" />
        </Button>
      </div>
    </div>
  );
};

export default ShowLink;
