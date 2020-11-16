import React, { useState, createContext, useEffect, useContext } from "react";

import { Loading } from "./Loading";

export const CurrentUserContext = createContext(null);

export const useUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // Fetch the user data from the API (/me/profile)
    fetch("api/me/profile")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data) {
          // When the data is received, update currentUser.
          setCurrentUser(data.profile.handle);
          setAvatar(data.profile.avatarSrc);
          // setAvatar(data.profile.author.avatarSrc);
          // Also, set `status` to `idle`
          setStatus("idle");
        }
      });
  }, []);
  console.log("avatar", avatar);

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <CurrentUserContext.Provider value={{ currentUser, status, avatar }}>
          {children}
        </CurrentUserContext.Provider>
      )}
    </>
  );
};

export default CurrentUserContext;
