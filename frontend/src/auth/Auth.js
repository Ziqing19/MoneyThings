import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../stylesheets/Auth.css";
import Login from "./Login.js";
import Signup from "./Signup.js";
import NewPassword from "../tabs/account/NewPassword.js";

export default function Auth() {
  return (
    <Router>
      <Switch>
        <Route path="/auth/signup">
          <Signup />
        </Route>
        <Route path="/auth/new-password">
          <NewPassword />
        </Route>
        <Route path="/auth">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
