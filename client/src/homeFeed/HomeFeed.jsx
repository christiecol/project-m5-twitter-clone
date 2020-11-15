import React from "react";

import { Tweet } from "../Tweets/Tweet";
import { TweetInput } from "../Tweets/postTweet/TweetInput";

import { useFeed } from "./HomeFeedProvider";
import { ErrorPage } from "../ErrorPage";
import { Loading } from "../Loading";

export const HomeFeed = () => {
  const { currentFeed, errorMsg, homeStatus } = useFeed();
  // console.log("current", currentFeed);

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
                  console.log(tweet.numLikes);
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
