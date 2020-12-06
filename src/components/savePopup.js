import React from "react";
import styled from "styled-components";

const Link = styled.div`
  margin: 0.5rem;
  background-color: black;
  color: white;
  display: block;
  height: 25pt;
  overflow: auto;
  white-space: nowrap;
`;

const SavePopup = (props) => {
  return (
    <Link>
      https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations
    </Link>
  );
};

export default SavePopup;
