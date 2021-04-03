import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth from "./auth/Auth.js";
import Logout from "./auth/Logout.js";
import Workspace from "./container/Workspace.js";
import * as utils from "./utils.js";

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    utils.getUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Router>
      {/* NAV */}
      <div>
        <ul>
          <li>Welcome, {user === undefined ? "Visitor" : user.username}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
        {/* CONTENT */}
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/">
            <Workspace />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}