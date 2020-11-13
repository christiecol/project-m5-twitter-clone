import React from "react";

import styled from "styled-components";

export const Header = (props) => {
  const { tweet } = props;
  const author = tweet.author;
  // console.log(tweet.media[0].url);
  return (
    <>
      <TweetDiv>
        <img src={author.avatarSrc} />
      </TweetDiv>
    </>
  );
};

const TweetDiv = styled.div``;
