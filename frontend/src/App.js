import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./auth/Auth.js";
import NavigationComponent from "./shared/NavigationComponent.js";

import Workspace from "./container/Workspace.js";
import * as utils from "./utils";

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    utils.getUser().then((user) => {
      setUser(user);
    });
  }, []);

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
