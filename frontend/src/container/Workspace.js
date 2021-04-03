import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Overview from "./Overview.js";
import Profile from "./Profile.js";
import AllTime from "./AllTime.js";
import Trends from "./Trends.js";
import Budget from "./Budget.js";
import SelectionPanel from "./SelectionPanel.js";

/***
 * Workspace represents for the functional zone of the webpage.
 * It switches its content to overview/all time/trends/budget/editing profile
 * according to different path.
 *
 * @returns {JSX.Element}
 */
export default function Workspace() {
  return (
    <Router>
      <Switch>
        <Route path={["/all-time", "/trends", "/budget"]}>
          <div className="row">
            <div className="col-4">
              <SelectionPanel />
            </div>
            <div className="col-8">
              <Route path="/all-time">
                <AllTime />
              </Route>
              <Route path="/trends">
                <Trends />
              </Route>
              <Route path="/budget">
                <Budget />
              </Route>
            </div>
          </div>
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Overview />
        </Route>
      </Switch>
    </Router>
  );
}