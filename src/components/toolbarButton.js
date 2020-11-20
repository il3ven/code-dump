import styled from "styled-components";

const ToolbarButton = styled.button`
   {
    color: white;
    border: none;
    background-color: inherit;
    margin: 0;
    padding: 0 8pt 0;
  }

  &:hover {
    background-color: rgb(116, 107, 105);
  }

  &:focus {
    outline: none;
  }
`;

export default ToolbarButton;
