import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "./stylesheet/Workspace.css";
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
    <div className="flex-grow-1 d-flex flex-column">
      <Router>
        <FunctionalNavbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path={["/all-time", "/trends", "/budget"]}>
              <div className="row flex-container">
                <div className="col-4 px-0">
                  <SelectionPanel />
                </div>
                <div className="col-8 px-0">
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
        </div>
      </Router>
    </div>
  );
}

function FunctionalNavbar() {
  return (
    <div className="d-flex justify-content-center py-3 border border-top border-bottom">
      <div className="container row">
        <Link className="col-3 text-center" to="/overview">
          OVERVIEW
        </Link>
        <Link className="col-3 text-center" to="/all-time">
          ALL TIME
        </Link>
        <Link className="col-3 text-center" to="/trends">
          TRENDS
        </Link>
        <Link className="col-3 text-center" to="/budget">
          BUDGET
        </Link>
      </div>
    </div>
  );
}