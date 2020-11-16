import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { useFeed } from "../../homeFeed/HomeFeedProvider";
import { Loading } from "../../Loading";
import { useUser } from "../../CurrentUserContext";
import { COLORS } from "../../constants";

export const TweetInput = () => {
  const [userInput, setUserInput] = useState("");
  const { toggleFetch, setToggleFetch, homeStatus, currentFeed } = useFeed();
  const { avatar } = useUser();
  console.log(currentFeed);

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
        <Home>
          <h2>Home</h2>
        </Home>
        <SplitDiv>
          <AvatarDiv>
            <Avatar src={avatar} />
          </AvatarDiv>

          <InputArea>
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
          </InputArea>
        </SplitDiv>
      </TweetBox>
    </>
  );
};

const Home = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid rgb(230, 230, 230);
`;

const SplitDiv = styled.div`
  display: flex;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TweetBox = styled.form`
  font-size: 18px;
  padding: 10px;
  position: relative;
  border-bottom: 10px solid rgb(230, 230, 230);
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

const AvatarDiv = styled.div``;

const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin: 0 10px;
`;

const ButtonCharactersLeft = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin- top: 1rem;
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
