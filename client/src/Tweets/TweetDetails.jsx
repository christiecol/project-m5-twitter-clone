import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tweet } from "./Tweet";
import ActionBar from "./ActionBar";

export const TweetDetails = () => {
  const { tweetId } = useParams();

  const [currentTweet, setCurrentTweet] = useState(null);
  const [tweetStatus, setTweetStatus] = useState("loading");

  useEffect(() => {
    // Fetch the user data from the API
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.tweet);
        if (data) {
          // When the data is received, update currentUser.
          setCurrentTweet(data.tweet);
          setTweetStatus("idle");
        }
      });
  }, []);
  // console.log(currentTweet);

  return (
    <>
      {!currentTweet || tweetStatus === "loading" ? (
        <p>Loading</p>
      ) : (
        <div>
          <Tweet key={currentTweet.id} tweet={currentTweet} />
        </div>
      )}
    </>
  );
};
