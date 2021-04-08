import React, { useState } from "react";
import propTypes from "prop-types";
import ProgressBar from "react-bootstrap/ProgressBar";
import SetBudget from "./SetBudget.js";

export default function Budget(props) {
  const [showBudgetPanel, setBudgetPanel] = useState(false);
  const currentExpenses = props.expense;
  const budget = 500;
  const barData = [];

  function toggleBudgetPanel() {
    setBudgetPanel(!showBudgetPanel);
  }

  Object.keys(currentExpenses).map((item) => {
    let totalExpense = 0;
    currentExpenses[item].map((item) => {
      totalExpense += item.amount;
    });

    const object = {};
    const ratio = ((totalExpense / budget) * 100).toFixed(2);
    object["amount"] = totalExpense;
    object["ratio"] = ratio;
    object["budget"] = budget;
    object["category"] = item;
    object["left"] = budget - totalExpense;
    barData.push(object);
  });

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

  barData.forEach((item, index) => {
    console.log(item, index);
  });

  return (
    <div
      className="flex-container"
      style={{ height: "80vh", overflowY: "scroll" }}
    >
      <div className="ProgessBar flex-column align-items-center .ml-1">
        {barData.map((item) => {
          return (
            <div
              key={item.category}
              style={{ padding: "5px", width: "70%", margin: "0 auto" }}
            >
              {item.category}
              <ProgressBar
                now={item.amount.toFixed(2)}
                variant={getVariant(item.ratio)}
                label={`${item.ratio}%`}
                max={budget}
              />
              {`$${item.amount.toFixed(2)} of $${budget}`}
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
