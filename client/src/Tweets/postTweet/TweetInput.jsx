import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { useFeed } from "../../homeFeed/HomeFeedProvider";
import { Loading } from "../../Loading";

export const TweetInput = () => {
  const [userInput, setUserInput] = useState("");
  // const [maxedChar, setMaxedChar] = useState(false);
  const { toggleFetch, setToggleFetch, homeStatus } = useFeed();

  const [charactersLeft, setCharactersLeft] = useState(280);

  const handleSubmit = () => {
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: userInput,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        //check status?
        if (homeStatus === "idle") {
          setToggleFetch(!toggleFetch);
        } else {
          <Loading />;
        }
      });
  };

  return (
    <>
      <TweetBox
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSubmit();
          setUserInput("");
          setCharactersLeft(280);
        }}
      >
        <TweetInputArea
          value={userInput}
          onChange={(ev) => {
            setUserInput(ev.target.value);
            setCharactersLeft(280 - ev.target.value.length);
          }}
        ></TweetInputArea>
        <ButtonCharactersLeft>
          <Characters>
            {charactersLeft >= 56 && <Safe>{charactersLeft}</Safe>}
            {charactersLeft <= 55 && charactersLeft >= 0 && (
              <Warning>{charactersLeft}</Warning>
            )}
            {charactersLeft < 0 && <Danger>{charactersLeft}</Danger>}
          </Characters>
          <Button type="submit" disabled={userInput.length <= 0}>
            Meow!
          </Button>
        </ButtonCharactersLeft>
      </TweetBox>
    </>
  );
};

const TweetBox = styled.form`
  font-size: 18px;
  padding: 10px;
  position: relative;
`;

const TweetInputArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  padding: 15px 12px;
  outline: none;
  width: 100%;
`;

const ButtonCharactersLeft = styled.div`
display: flex
align-items: center;
justify-content: space-between;
`;

const Button = styled.button`
  background-color: #ccc;
  border: 1px solid #eee;
  border-radius: 10px;
  color: #fefefe;
  font-size: 18px;
  margin-top: 10px;
  padding: 10px 25px;
  cursor: pointer;

  &:disabled {
    color: red;
    cursor: default;
  }
`;

const Characters = styled.span`
  color: green;
  margin-right: 10px;
`;

const Safe = styled.p`
  color: green;
`;

const Warning = styled.p`
  color: yellow;
`;
const Danger = styled.p`
  color: red;
`;
