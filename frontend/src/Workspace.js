import React, { useState, useEffect } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import "./stylesheets/Workspace.css";
import Overview from "./tabs/overview/Overview.js";
import Account from "./tabs/account/Account.js";
import AllTime from "./tabs/alltime/AllTime.js";
import Trends from "./tabs/trends/Trends.js";
import Budget from "./tabs/budget/Budget.js";
import SelectionPanel from "./tabs/dateRangeSelection/SelectionPanel.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Instruction from "./shared/Instruction";
import propTypes from "prop-types";

/***
 * Workspace represents for the functional zone of the webpage.
 * It switches its content to overview/all time/trends/budget/editing profile
 * according to different path.
 *
 * @returns {JSX.Element}
 */
export default function Workspace(props) {
  const [recent, setRecent] = useState([]);
  const [dateRange, setDateRange] = useState(getThisMonth());
  const [income, setIncome] = useState({});
  const [expense, setExpense] = useState({});
  const [dateGroup, setDateGroup] = useState({});

  useEffect(() => {
    fetch("/transaction/recent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRange: [dateRange[0].getTime(), dateRange[1].getTime()],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setRecent(res);
      })
      .catch((err) => {
        alert(err);
      });
  }, [dateRange]);

  useEffect(() => {
    setDateGroup({});
    const dateArray = [
      ...new Set(recent.map((item) => new Date(item.date).toDateString())),
    ];
    for (let date of dateArray) {
      const array = recent.filter(
        (item) => new Date(item.date).toDateString() === date
      );
      setDateGroup((prev) => ({ ...prev, [date]: array }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recent]);

  useEffect(() => {
    setIncome({});
    setExpense({});
    for (let category of props.user.categories["Income"]) {
      const array = recent.filter((item) => item.category === category);
      if (array.length === 0) continue;
      setIncome((prev) => ({ ...prev, [category]: array }));
    }
    for (let category of props.user.categories["Expense"]) {
      const array = recent.filter((item) => item.category === category);
      if (array.length === 0) continue;
      setExpense((prev) => ({ ...prev, [category]: array }));
    }
  }, [recent, props.user.categories]);

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <FunctionalNavbar />
      <div className="flex-grow-1">
        <Switch>
          <Route path={["/all-time", "/trends", "/budget"]}>
            <div className="row flex-container">
              <div className="col-4 px-0">
                <SelectionPanel
                  user={props.user}
                  refreshPage={props.refreshPage}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  recent={recent}
                  setRecent={setRecent}
                />
              </div>
              <div className="col-8 px-0">
                <Route path="/all-time">
                  <AllTime
                    user={props.user}
                    setUser={props.setUser}
                    refreshPage={props.refreshPage}
                    recent={recent}
                    setRecent={setRecent}
                    income={income}
                    expense={expense}
                    dateGroup={dateGroup}
                  />
                </Route>
                <Route path="/trends">
                  <Trends
                    income={income}
                    expense={expense}
                    dateGroup={dateGroup}
                  />
                </Route>
                <Route path="/budget">
                  <Budget
                    expense={expense}
                    dateRange={dateRange}
                    user={props.user}
                    dateGroup={dateGroup}
                    setUser={props.setUser}
                  />
                </Route>
              </div>
            </div>
          </Route>
          <Route path="/account">
            <Account {...props} />
          </Route>
          <Route path="/overview">
            <Overview {...props} />
          </Route>
          <Route path="/">
            <Redirect to="/overview" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

Workspace.propTypes = {
  user: propTypes.object.isRequired,
  setUser: propTypes.func.isRequired,
  refreshPage: propTypes.func.isRequired,
};

function FunctionalNavbar() {
  return (
    <div className="d-flex justify-content-center py-3 functional-navbar">
      <div className="container row position-relative">
        <NavLink
          className="col-3 text-center fw-bold"
          to="/overview"
          activeClassName="active-link"
        >
          OVERVIEW
        </NavLink>
        <NavLink
          className="col-3 text-center fw-bold"
          to="/all-time"
          activeClassName="active-link"
        >
          ALL TIME
        </NavLink>
        <NavLink
          className="col-3 text-center fw-bold"
          to="/trends"
          activeClassName="active-link"
        >
          TRENDS
        </NavLink>
        <NavLink
          className="col-3 text-center fw-bold"
          to="/budget"
          activeClassName="active-link"
        >
          BUDGET
        </NavLink>
        <div
          className="position-absolute start-100 instruction-icon"
          data-bs-toggle="modal"
          data-bs-target="#instruction_modal"
        >
          <FontAwesomeIcon icon={["fas", "question"]} />
        </div>
        <Instruction />
      </div>
    </div>
  );
}

function getThisMonth() {
  const end_date = new Date();
  const start_date = new Date();
  start_date.setDate(1);
  start_date.setHours(0);
  start_date.setMinutes(0);
  start_date.setSeconds(0);
  return [start_date, end_date];
}
