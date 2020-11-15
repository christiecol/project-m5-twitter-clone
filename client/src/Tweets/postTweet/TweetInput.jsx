import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { useFeed } from "../../homeFeed/HomeFeedProvider";
import { Loading } from "../../Loading";
import { useUser } from "../../CurrentUserContext";
import { COLORS } from "../../constants";

export const TweetInput = () => {
  const [userInput, setUserInput] = useState("");
  // const [maxedChar, setMaxedChar] = useState(false);
  const { toggleFetch, setToggleFetch, homeStatus } = useFeed();
  const { currentUser } = useUser();
  console.log(currentUser);

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

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      handleSubmit();
      setUserInput("");
      setCharactersLeft(280);
    }
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
        <h2>Home</h2>
        <div>
          <img src={currentUser.avatarSrc} />
        </div>
        <TweetInputArea
          type="text"
          aria-label="write a tweet"
          placeholder="What's on your mind?"
          value={userInput}
          onChange={(ev) => {
            setUserInput(ev.target.value);
            setCharactersLeft(280 - ev.target.value.length);
          }}
          onKeyDown={handleKeyDown}
        ></TweetInputArea>
        <ButtonCharactersLeft>
          <Characters>
            {charactersLeft >= 56 && <Safe>{charactersLeft}</Safe>}
            {charactersLeft <= 55 && charactersLeft >= 0 && (
              <Warning>{charactersLeft}</Warning>
            )}
            {charactersLeft < 0 && <Danger>{charactersLeft}</Danger>}
          </Characters>
          <Button
            type="submit"
            aria-label="post your tweet"
            disabled={userInput.length <= 0}
          >
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
  all: unset;
  border-radius: 10px;
  box-sizing: border-box;
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  padding: 15px 12px;
  outline: none;
  width: 100%;
  height: 7rem;

  &:focus {
    border: 1px solid ${COLORS.primary};
  }
`;

const ButtonCharactersLeft = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1rem 0 2rem;
`;

const Button = styled.button`
  background-color: ${COLORS.primary};
  border: 1px solid #eee;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  margin-top: 10px;
  margin-left: 20px;
  padding: 15px 30px;
  cursor: pointer;

  &:disabled {
    color: white;
    background-color: ${COLORS.primaryBackground};
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
