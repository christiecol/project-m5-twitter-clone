import React, { useState } from "react";

import { Tweet } from "../Tweets/Tweet";
import { TweetInput } from "../Tweets/postTweet/TweetInput";

import { useFeed } from "./HomeFeedProvider";
import { ErrorPage } from "../ErrorPage";
import { Loading } from "../Loading";

export const HomeFeed = () => {
  const { currentFeed, errorMsg, homeStatus } = useFeed();

  const [avatar, setAvatar] = useState("");

  //trying to render currentuser avatar

  // const avatarSource = () => {
  //   return currentFeed.map((tweet) => {
  //     console.log(tweet.author.handle);
  //     if (tweet.author.handle === "treasurymog") {
  //       const treasurymogAvatar = tweet.author.avatarSrc;
  //       setAvatar(treasurymogAvatar);
  //     }
  //   });
  // };

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
              <div>
                <TweetInput />
                {currentFeed.map((tweet) => {
                  return (
                    <Tweet
                      key={tweet.id}
                      tweet={tweet}
                      id={tweet.id}
                      handle={tweet.author.handle}
                      {...tweet}
                    />
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
