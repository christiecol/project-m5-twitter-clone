import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { useUser } from "./CurrentUserContext";

// svg logo
import { ReactComponent as Logo } from "./logo.svg";

import { COLORS } from "./constants";

export const Sidebar = () => {
  const { currentUser, status } = useUser();
  // console.log(currentUser);
  return (
    <SidebarDiv>
      <Logo style={{ margin: "20px 0px 20px 0px", height: "4rem" }} />

      <IconContext.Provider value={{ zIndex: 2, size: "2rem" }}>
        <SidebarLinkDiv>
          <FiHome />
          <StyledLink exact to="/">
            Home
          </StyledLink>
        </SidebarLinkDiv>

        <SidebarLinkDiv>
          <FiUser />

          <StyledLink exact to={status === "" ? `/${currentUser}` : "Loading"}>
            Profile
          </StyledLink>
        </SidebarLinkDiv>

        <SidebarLinkDiv>
          <FiBell />
          <StyledLink exact to="/notifications">
            Notifications
          </StyledLink>
        </SidebarLinkDiv>

        <SidebarLinkDiv>
          <FiBookmark />
          <StyledLink exact to="/bookmarks">
            Bookmarks
          </StyledLink>
        </SidebarLinkDiv>
      </IconContext.Provider>
    </SidebarDiv>
  );
};

const SidebarDiv = styled.div`
  margin-left: 50px;
  position: relative;
  height: 100vh;
  width: 20vw;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  padding: 10px;
  color: black;
  font-size: 1.5rem;
  z-index: 1;
  margin-left: 30px;

  &.active {
    color: ${COLORS.primary};
  }
`;

const SidebarLinkDiv = styled.div`
  display: flex;
  align-items: center;

  font-weight: bold;
  padding: 10px;
  border-radius: 50px;
  line-height: 2rem;

  &:hover {
    background-color: ${COLORS.primaryBackground};
  }
`;
