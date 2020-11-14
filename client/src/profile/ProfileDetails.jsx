import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Profile } from "./Profile";
import { ProfileFeed } from "./ProfileFeed";
import { ErrorPage } from "../ErrorPage";
import { Loading } from "../Loading";

export const ProfileDetails = () => {
  const { profileId } = useParams();
  const [currentProfile, setCurrentProfile] = useState(null);
  // const [profileStatus, setProfileStatus] = useState("loading");
  // const [errorMsg, setErrorMsg] = useState(""); // console.log(profileId);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data) {
          // When the data is received, update currentUser.
          setCurrentProfile(data.profile);
          // setProfileStatus("idle");
        }
      });
    // .catch((error) => {
    //   setErrorMsg("error");
    // });
  }, [profileId]);

  // console.log(currentProfile);
  if (!currentProfile) {
    return (
      // <>
      //   {errorMsg === "error" ? (
      //     <ErrorPage />
      //   ) : (
      //     <>
      //       {!currentProfile || profileStatus === "loading" ? (
      //         <Loading />
      //       ) : (
      <>
        <ProfileDiv>
          <Profile
            id={currentProfile.handle}
            key={currentProfile.handle}
            profile={currentProfile}
          />
          <ProfileFeed handle={currentProfile.handle} />
        </ProfileDiv>
      </>
      //       )}
      //     </>
      //   )}
      // </>
    );
  }
  return <p>Loading</p>;
};

const ProfileDiv = styled.div`
  width: 59.7vw;
`;
