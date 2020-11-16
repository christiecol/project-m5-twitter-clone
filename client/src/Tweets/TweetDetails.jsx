import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Tweet } from "./Tweet";
import { Loading } from "../Loading";
import { ErrorPage } from "../ErrorPage";

export const TweetDetails = () => {
  const { tweetId } = useParams();

  const [currentTweet, setCurrentTweet] = useState(null);
  const [tweetStatus, setTweetStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");

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
      })
      .catch((error) => setErrorMsg("error"));
  }, []);

  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <>
          {!currentTweet || tweetStatus === "loading" ? (
            <Loading />
          ) : (
            <>
              <div>
                <Tweet key={currentTweet.id} tweet={currentTweet} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
