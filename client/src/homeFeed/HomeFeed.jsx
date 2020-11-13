import React from "react";

import { Tweet } from "../Tweets/Tweet";

import { useFeed } from "./HomeFeedProvider";

export const HomeFeed = () => {
  const { currentFeed } = useFeed();
  console.log("current", currentFeed);

  return (
    <div>
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
    </div>
  );
};
