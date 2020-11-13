// import React, { createContext, useContext, useState } from "react";

// export const TweetContext = createContext(null);

// export const useTweet = () => {
//   return useContext(TweetContext);
// };

// export const TweetProvider = ({ children }) => {
//   const [numOfLikes, setNumOfLikes] = useState(0);
//   const [numOfRetweets, setNumOfRetweets] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isRetweeted, setIsRetweeted] = useState(false);

//   const handleToggleLike = () => {
//     const incOrDec = isLiked ? -1 : 1;

//     setIsLiked(!isLiked);
//     setNumOfLikes(numOfLikes + incOrDec);
//   };

//   const handleToggleRetweet = () => {
//     const incOrDec = isRetweeted ? -1 : 1;

//     setIsRetweeted(!isRetweeted);
//     setNumOfRetweets(numOfRetweets + incOrDec);
//   };

//   return (
//     <TweetContext.Provider
//       value={{
//         numOfLikes,
//         setNumOfLikes,
//         numOfRetweets,
//         setNumOfRetweets,
//         handleToggleLike,
//         handleToggleRetweet,
//       }}
//     >
//       {children}
//     </TweetContext.Provider>
//   );
// };
