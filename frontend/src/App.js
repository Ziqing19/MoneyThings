import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./auth/Auth.js";
import NavigationComponent from "./shared/NavigationComponent.js";

import Workspace from "./container/Workspace.js";

export default function App() {
  return (
    <Router>
      <NavigationComponent></NavigationComponent>
      <Switch>
        <Route path="/auth">
          <Auth></Auth>
        </Route>
        <Route path="/">
          <Workspace></Workspace>
        </Route>
      </Switch>
    </Router>
  );
}
