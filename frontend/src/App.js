import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth from "./auth/Auth.js";

export default function App() {
  return (
    <Router>
      {/* nav */}
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth">Login</Link>
          </li>
        </ul>
        {/* content */}
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
