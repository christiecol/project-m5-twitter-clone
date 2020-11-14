import React from "react";

import { Tweet } from "../Tweets/Tweet";
import { TweetInput } from "../Tweets/postTweet/TweetInput";

import { useFeed } from "./HomeFeedProvider";
import { useUser } from "../CurrentUserContext";
import { ErrorPage } from "../ErrorPage";
import { Loading } from "../Loading";

export const HomeFeed = () => {
  // const { status, setStatus } = useUser();
  const { currentFeed, errorMsg, homeStatus } = useFeed();
  // console.log("current", currentFeed);
  // if (currentFeed.length > 0 && homeStatus === "") {

  return (
    // <>
    //   {errorMsg === "error" ? (
    //     <ErrorPage />
    //   ) : (
    //     <>
    //       {homeStatus === "loading" ? (
    //         <Loading />
    //       ) : (
    //         <>
    <div>
      <TweetInput />
      {currentFeed.map((tweet) => {
        // console.log(tweet.numLikes);
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
    //         </>
    //       )}
    //     </>
    //   )}
    // </>
  );
};
