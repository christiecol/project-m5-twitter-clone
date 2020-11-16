import React from "react";
import { Icon } from "react-icons-kit";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import styled from "styled-components";

export const ErrorPage = () => {
  return (
    <div>
      <IconDiv>
        <Icon icon={bomb} size={100} />
      </IconDiv>
      <TextDiv>
        <h1>An unknown error has occurred.</h1>
        <P>
          Please try refreshing the page, or{" "}
          <span>
            <a href="#">contact support</a>
          </span>{" "}
          if the problem persists.
        </P>
      </TextDiv>
    </div>
  );
};

const IconDiv = styled.div`
  width: 60vw;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`;

const TextDiv = styled.div`
  margin-top: 2rem;
  width: 60vw;
  left: 50%;
  text-align: center;
`;

const P = styled.p`
  font-size: 1.3rem;
  margin-top: 10px;
`;
