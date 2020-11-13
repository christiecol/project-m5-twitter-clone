import React, { useState, createContext, useEffect, useContext } from "react";
import { Tweet } from "../Tweets/Tweet";

export const HomeFeedContext = createContext(null);

export const useFeed = () => useContext(HomeFeedContext);

export const HomeFeedProvider = ({ children }) => {
  const [currentFeed, setCurrentFeed] = useState([]);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfRetweets, setNumOfRetweets] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  useEffect(() => {
    // Fetch the user data from the API
    fetch("/api/me/home-feed")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          const tweets = Object.values(data.tweetsById);
          // console.log(tweets);
          setCurrentFeed(tweets);
        }
      });
  }, []);
  //   console.log(currentFeed);

  //   console.log(singleTweetLiked);

  // Copied over from Whimsy workshop
  const handleToggleLike = () => {
    const incOrDec = isLiked ? -1 : 1;

    setIsLiked(!isLiked);
    setNumOfLikes(incOrDec);
  };

  const handleToggleRetweet = () => {
    const incOrDec = isRetweeted ? -1 : 1;

    setIsRetweeted(!isRetweeted);
    setNumOfRetweets(numOfRetweets + incOrDec);
  };

  return (
    <HomeFeedContext.Provider
      value={{
        currentFeed,
        numOfLikes,
        setNumOfLikes,
        numOfRetweets,
        setNumOfRetweets,
        handleToggleLike,
        handleToggleRetweet,
      }}
    >
      {children}
    </HomeFeedContext.Provider>
  );
};
