import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./stylesheet/Workspace.css";
import Overview from "./Overview.js";
import Profile from "./Profile.js";
import AllTime from "./AllTime.js";
import Trends from "./Trends.js";
import Budget from "./Budget.js";
import SelectionPanel from "./SelectionPanel.js";
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
  const [dateRange, setDateRange] = useState(getLastWeek());
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
    // console.log(income, expense);
  }, [recent, props.user.categories]);

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <Router>
        <FunctionalNavbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path={["/all-time", "/trends", "/budget"]}>
              <div className="row flex-container">
                <div className="col-4 px-0">
                  <SelectionPanel
                    user={props.user}
                    setUser={props.setUser}
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

Workspace.propTypes = {
  user: propTypes.object.isRequired,
  setUser: propTypes.func.isRequired,
};

function FunctionalNavbar() {
  return (
    <div className="d-flex justify-content-center py-3 border-top border-bottom">
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

function getLastWeek() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return [date, new Date()];
}
