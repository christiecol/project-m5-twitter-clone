import React from "react";

import { useHistory } from "react-router-dom";

import styled from "styled-components";
import moment from "moment";

import { COLORS } from "../constants";
import { Tweet } from "../Tweets/Tweet";
import { ProfileFeed } from "./ProfileFeed";

export const Profile = (props) => {
  const { profile } = props;
  const shortDate = moment(profile.joined).format("MMM YYYY");
  console.log(shortDate);
  const banner = profile.bannerSrc;
  const avatar = profile.avatarSrc;
  console.log(profile);

  function renderTweets() {
    return <Tweet />;
  }

  return (
    <ProfileDiv>
      <Banner src={banner} />
      <Avatar src={avatar} />
      <div>
        <UserInfoDiv>
          <NameAndFollowButton>
            {profile.displayName}
            <span>
              {" "}
              <FollowButton type="button">Following</FollowButton>
            </span>
          </NameAndFollowButton>
          <p>@{profile.handle}</p>
          <p>{profile.bio}</p>
          <p>
            {profile.location}
            <Date>{shortDate}</Date>
          </p>
          <p>
            <strong>{profile.numFollowers}</strong> Followers
            <span>
              {" "}
              <strong>{profile.numFollowing}</strong> Following
            </span>
          </p>
        </UserInfoDiv>
        <ButtonDiv>
          <TweetButton onClick={renderTweets} type="button">
            Tweets
          </TweetButton>
          <MediaButton type="button">Media</MediaButton>
          <LikesButton type="button">Likes</LikesButton>
        </ButtonDiv>
        <FeedDiv>
          <ProfileFeed />
        </FeedDiv>
      </div>
    </ProfileDiv>
  );
};

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid rgb(230, 230, 230);
`;

const Banner = styled.img`
  overflow: hidden;
  position: relative;
  height: 30vh;
`;

const Avatar = styled.img`
  position: absolute;
  align-self: flex-start;
  border-radius: 50%;
  width: 10rem;
  border: 3px solid white;
  margin-left: 2rem;
  margin-top: 20vh;
`;

const NameAndFollowButton = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FollowButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${COLORS.primary};
  color: white;
  border-radius: 15px;
  padding: 10px;
`;

const UserInfoDiv = styled.div`
  margin: 7rem 0 2rem 2rem;
  width: 80%;
`;

const Date = styled.span`
  margin-left: 50px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const TweetButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 33.33%;

  &:hover {
    color: ${COLORS.primary};
    border-bottom: 3px solid ${COLORS.primary};
  }
  &.active {
    color: ${COLORS.primary};
  }
`;

const MediaButton = styled(TweetButton)``;

const LikesButton = styled(TweetButton)``;

const FeedDiv = styled.div`
  width: 62vw;
`;
