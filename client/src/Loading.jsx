import React from "react";
import { IconContext } from "react-icons";
import { FiLoader } from "react-icons/fi";

import styled, { keyframes } from "styled-components";

const rotate = keyframes`
0% {
    transform: roatate(0deg);
}
100% {
    transform: rotate(360deg)
}
`;

export const Loading = () => {
  return (
    <IconDiv>
      <IconContext.Provider value={{ size: "2rem" }}>
        <FiLoader />
      </IconContext.Provider>
    </IconDiv>
  );
};

const IconDiv = styled.div`
  animation: ${rotate} 2s linear infinite;
  opacity: 0.5;
  width: 60vw;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`;
