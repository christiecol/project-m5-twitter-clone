import React, { useState, createContext, useEffect, useContext } from "react";

import { Loading } from "./Loading";
import { ErrorPage } from "./ErrorPage";

export const CurrentUserContext = createContext(null);

export const useUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

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
          // Also, set `status` to `idle`
          setStatus("idle");
        }
      })
      .catch((error) => {
        setStatus("error");
      });
  }, []);

  return (
    <>
      {status === "error" ? (
        <ErrorPage />
      ) : (
        <>
          {status === "loading" ? (
            <Loading />
          ) : (
            <CurrentUserContext.Provider value={{ currentUser, status }}>
              {children}
            </CurrentUserContext.Provider>
          )}
        </>
      )}
    </>
  );
};

export default CurrentUserContext;
