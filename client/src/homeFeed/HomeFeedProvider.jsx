import React, { useState, createContext, useEffect, useContext } from "react";

export const HomeFeedContext = createContext(null);

export const useFeed = () => useContext(HomeFeedContext);

export const HomeFeedProvider = ({ children }) => {
  const [currentFeed, setCurrentFeed] = useState([]);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfRetweets, setNumOfRetweets] = useState(0);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [toggleFetch, setToggleFetch] = useState(false);
  const [homeStatus, setHomeStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  // console.log("isLiked", isLiked);

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
          const sortedTweets = tweets.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
          );
          // console.log(tweets);
          setHomeStatus("idle");
          setCurrentFeed(sortedTweets);
        }
      })
      .catch((error) => setErrorMsg("error"));
  }, [toggleFetch]);

  // Copied over from Whimsy workshop
  const handleToggleLike = async (tweetId) => {
    // console.log("tweetId", tweetId);
    const currentFeedWithLike = currentFeed.map((tweet) => {
      console.log(tweet);
      if (tweet.id === tweetId) {
        const isLikedToggled = !tweet.isLiked;
        const incOrDec = isLikedToggled ? 1 : -1;
        return {
          ...tweet,
          numLikes: tweet.numLikes + incOrDec,
          isLiked: isLikedToggled,
        };
      }
      return tweet;
    });

    const liked = currentFeedWithLike.find((tweet) => tweet.id === tweetId)
      .isLiked;

    setCurrentFeed(currentFeedWithLike);
    //fetch
    const raw = await fetch(`/api/tweet/${tweetId}/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        like: liked,
      }),
    });
    const json = await raw.json();
    console.log({ json });
  };

  const handleToggleRetweet = () => {
    const incOrDec = isRetweeted ? -1 : 1;

    setIsRetweeted(!isRetweeted);
    setNumOfRetweets(numOfRetweets + incOrDec);
  };

  return (
    <HomeFeedContext.Provider
      value={{
        errorMsg,
        setErrorMsg,
        homeStatus,
        setHomeStatus,
        toggleFetch,
        setToggleFetch,
        currentFeed,
        setCurrentFeed,
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
