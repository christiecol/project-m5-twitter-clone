import React, { useEffect, useState } from "react";
import { ErrorPage } from "../ErrorPage";
import styled from "styled-components";

import { Tweet } from "../Tweets/Tweet";
import { useFeed } from "../homeFeed/HomeFeedProvider";
import { Loading } from "../Loading";

export const ProfileFeed = (props) => {
  const { handle } = props;

  const { errorMsg, setErrorMsg, homeStatus, setHomeStatus } = useFeed();

  const [currentFeed, setCurrentFeed] = useState([]);
  console.log(handle);
  useEffect(() => {
    // Fetch the user data from the API
    fetch(`/api/${handle}/feed`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          const tweets = Object.values(data.tweetsById);
          console.log(tweets);
          // When the data is received, update currentUser.
          setCurrentFeed(tweets);
          setHomeStatus("idle");
        }
      })
      .catch((error) => setErrorMsg("error"));
  }, []);

  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <>
          {homeStatus === "loading" ? (
            <Loading />
          ) : (
            <>
              <ProfileFeedDiv>
                {currentFeed.map((tweet) => {
                  return (
                    <Tweet
                      key={tweet.id}
                      tweet={tweet}
                      id={tweet.id}
                      handle={tweet.author.handle}
                    />
                  );
                })}
              </ProfileFeedDiv>
            </>
          )}
        </>
      )}
    </>
  );
};

const ProfileFeedDiv = styled.div`
  width: 62vw;
`;
