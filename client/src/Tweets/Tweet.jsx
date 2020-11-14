import React from "react";
import { useHistory } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiRepeat } from "react-icons/fi";

import styled from "styled-components";
import moment from "moment";
import ActionBar from "./ActionBar";
// import Header from "./Header";

export const Tweet = (props) => {
  const { tweet, id, handle, numLikes } = props;
  console.log("numLiked", numLikes);
  const history = useHistory();
  const shortDate = moment(tweet.timestamp).format("MMM Do");
  const author = tweet.author;
  const media = tweet.media.map((image) => {
    return image.url;
  });

  function handleSingleTweetClick() {
    history.push(`/tweet/${id}`);
  }

  function handleProfileClick() {
    history.push(`/${handle}`);
  }

  return (
    <>
      <TweetDiv tabIndex="0" aria-label="View tweet">
        {/* avatar div */}
        <AvatarDiv>
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <RetweetIconDiv>{tweet.retweetFrom && <FiRepeat />}</RetweetIconDiv>
          </IconContext.Provider>
          <Avatar onClick={handleProfileClick} src={author.avatarSrc} />
        </AvatarDiv>

        {/* tweet contents div */}
        <TweetContents>
          <div onClick={handleSingleTweetClick}>
            {tweet.retweetFrom && (
              <RemeowDiv>
                <RetweetP>{tweet.retweetFrom.displayName} Remeowed</RetweetP>
              </RemeowDiv>
            )}

            <TweetStatus>
              <UserInfo>
                <DisplayName>{author.displayName}</DisplayName>
                <Handle>@{author.handle}</Handle>
                <TimeStamp>{shortDate}</TimeStamp>
              </UserInfo>

              <TweetStatusP>{tweet.status}</TweetStatusP>
              <TweetImage src={media} />
            </TweetStatus>
          </div>
          <ActionBar tweetId={id} numLikes={numLikes} />
        </TweetContents>
      </TweetDiv>
    </>
  );
};

const TweetDiv = styled.div`
  display: flex;
  padding-top: 0;
  background: white;
  width: 57vw;
  padding: 0px 16px;
  text-align: left;
  border-left: 1px solid rgb(230, 236, 240);
  border-right: 1px solid rgb(230, 236, 240);
  border-top: 1px solid rgb(230, 236, 240);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
`;

const AvatarDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px;
  padding-top: 16px;
`;

const RetweetP = styled.p`
  font-size: 15px;
  position: relative;
`;

const RetweetIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
`;

const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const RemeowDiv = styled.div`
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const DisplayName = styled.h5`
  margin-right: 7px;
`;

const Handle = styled.p`
  margin: 0px 7px;
  font-size: 1rem;
`;

const TimeStamp = styled.p`
  margin-left: 7px;
  font-size: 1rem;
`;

const TweetContents = styled.div``;

const TweetStatus = styled.div`
  padding: 0;
  margin: 0;
`;

const TweetStatusP = styled.p`
  font-size: 20px;
`;

const TweetImage = styled.img`
  width: 45vw;
  height: auto;
  border-radius: 20px;
`;
