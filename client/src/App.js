import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { HomeFeed } from "./homeFeed/HomeFeed";
import { Notifications } from "./Notifications";
import { Bookmarks } from "./Bookmarks";
import { TweetDetails } from "./Tweets/TweetDetails";
import { ProfileDetails } from "./profile/ProfileDetails";
import { Sidebar } from "./Sidebar";
import { CurrentUserProvider } from "./CurrentUserContext";
import { HomeFeedProvider } from "./homeFeed/HomeFeedProvider";

const App = () => {
  return (
    <CurrentUserProvider>
      <HomeFeedProvider>
        <Router>
          <Div>
            <Sidebar />
            <Switch>
              <Route exact path="/">
                <HomeFeed />
              </Route>

              <Route exact path="/notifications">
                <Notifications />
              </Route>

              <Route exact path="/bookmarks">
                <Bookmarks />
              </Route>

              <Route exact path="/tweet/:tweetId">
                <TweetDetails />
              </Route>

              <Route exact path="/:profileId">
                <ProfileDetails />
              </Route>
            </Switch>
          </Div>
        </Router>
      </HomeFeedProvider>
    </CurrentUserProvider>
  );
};

const Div = styled.div`
  display: flex;
`;

export default App;
