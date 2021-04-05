import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./auth/Auth.js";
import NavigationComponent from "./shared/NavigationComponent.js";

import Workspace from "./container/Workspace.js";
import * as utils from "./utils";

export default function App() {
  const [user, setUser] = useState();

  function getUser() {
    utils.getUser().then((user) => {
      console.log(user);
      setUser(user);
    });
  }

  useEffect(getUser, []);

  return (
    <Router>
      <NavigationComponent user={user} />
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/">
          <Workspace />
        </Route>
      </Switch>
    </Router>
  );
}
