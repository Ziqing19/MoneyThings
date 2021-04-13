import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Auth from "./auth/Auth.js";
import NavigationComponent from "./NavigationComponent.js";

import Workspace from "./Workspace.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/Global.css";

export default function App() {
  const [user, setUser] = useState();
  const [flag, refreshPage] = useState(true);

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
      console.log(user);
    });
  }, [flag]);

  return (
    <Router>
      <NavigationComponent user={user} />
      <Switch>
        <Route path="/auth">
          {user !== undefined ? <Redirect to="/" /> : <Auth />}
        </Route>
        <Route path="/">
          {user === undefined ? (
            <Redirect to="/auth" />
          ) : (
            <Workspace
              user={user}
              refreshPage={refreshPage}
              setUser={setUser}
            />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

async function getUser() {
  const resRaw = await fetch("/authentication/get-user");
  if (resRaw.status !== 204) {
    return await resRaw.json();
  }
}
