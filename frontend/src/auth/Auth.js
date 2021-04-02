import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login.js";
import Signup from "./Signup.js";

export default function Auth() {
  return (
    <Router>
      <Switch>
        <Route path="/auth/signup">
          <Signup />
        </Route>
        <Route path="/auth">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
