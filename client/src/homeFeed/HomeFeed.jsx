import React from "react";

import { Tweet } from "../Tweets/Tweet";
import { TweetInput } from "../Tweets/postTweet/TweetInput";

import { useFeed } from "./HomeFeedProvider";

export const HomeFeed = () => {
  const { currentFeed } = useFeed();
  // console.log("current", currentFeed);

  return (
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
            numLikes={tweet.numLikes}
          />
        );
      })}
    </div>
  );
};
