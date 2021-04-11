import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import ProgressBar from "react-bootstrap/ProgressBar";
import SetBudget from "./SetBudget.js";

export default function Budget(props) {
  const [showBudgetPanel, setBudgetPanel] = useState(false);
  const [barData, setBarData] = useState([]);
  // TODO unused budget???
  const [budget, setBudget] = useState({ category: "", amount: 0 });
  //const [budgets, SetBudgets] = useState({});
  //console.log(budgets);
  useEffect(() => {
    fetch("/user/get-budget")
      .then((resRaw) => {
        return resRaw.json().then((res) => {
          return res.budget;
        });
      })
      .then((budgets) => {
        setBarData([]);
        console.log("empty barData", barData);
        console.log(budgets);
        Object.keys(props.expense).map((category) => {
          if (category in budgets) {
            let totalExpense = 0;
            props.expense[category].map((item) => {
              totalExpense += item.amount;
            });
            const object = {};
            const ratio = ((totalExpense / budgets[category]) * 100).toFixed(2);
            object["amount"] = totalExpense;
            object["ratio"] = ratio;
            object["budget"] = budgets[category];
            object["category"] = category;
            object["left"] = budgets[category] - totalExpense;
            setBarData((prev) => Array.from([...prev, object]));
          }
        });
      });
    //console.log("budget", budget);
  }, [props.expense, budget]);
  console.log("updated barData", barData);

  function toggleBudgetPanel() {
    setBudgetPanel(!showBudgetPanel);
  }

  function getVariant(ratio) {
    if (ratio < 25) {
      return "info";
    }
    if (ratio < 50) {
      return "success";
    }
    if (ratio < 75) {
      return "";
    }
    if (ratio < 100) {
      return "warning";
    }
    return "danger";
  }

  return (
    <div
      className="flex-container"
      style={{ height: "80vh", overflowY: "scroll" }}
    >
      <div className="ProgessBar flex-column align-items-center .ml-1">
        {barData.map((item, index) => {
          return (
            <div
              key={item.category + index}
              style={{ padding: "5px", width: "70%", margin: "0 auto" }}
            >
              {item.category}
              <ProgressBar
                now={item.amount.toFixed(2)}
                variant={getVariant(item.ratio)}
                label={`${item.ratio}%`}
                max={item.budget}
              />
              {`$${item.amount.toFixed(2)} of $${item.budget}`}
              <span style={{ float: "right" }}>
                {item.left > 0
                  ? `${item.left.toFixed(2)} left`
                  : `${Math.abs(item.left).toFixed(2)} Over`}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className="setBudgetButton flex-container"
        style={{ padding: "5px", width: "70%", margin: "0 auto" }}
      >
        <div className="text-center border-bottom py-3 position-relative">
          Add Expense Budget
          {showBudgetPanel ? null : (
            <div
              className="position-absolute top-50 translate-middle-y new-btn"
              onClick={toggleBudgetPanel}
            >
              <i className="fas fa-plus fa-2x" />
            </div>
          )}
        </div>
        <div id="set_budget_panel">
          {showBudgetPanel ? (
            <SetBudget
              user={props.user}
              setUser={props.setUser}
              toggle={toggleBudgetPanel}
              setBudget={setBudget}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

Budget.propTypes = {
  expense: propTypes.object.isRequired,
  dateGroup: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  setUser: propTypes.func.isRequired,
};
