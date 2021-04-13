import React, { useState, useEffect } from "react";
import propTypes from "prop-types";

import SetBudget from "./SetBudget.js";
import BarPanel from "./barPanel.js";

export default function Budget(props) {
  const [showBudgetPanel, setBudgetPanel] = useState(false);
  const [barData, setBarData] = useState([]);
  const [budget, setBudget] = useState({ category: "", amount: 0 });
  useEffect(() => {
    const fetchBudget = async () => {
      fetch("/user/get-budget")
        .then((resRaw) => {
          return resRaw.json().then((res) => {
            return res.budget;
          });
        })
        .then((budgets) => {
          setBarData([]);
          Object.keys(props.expense).map((category) => {
            if (category in budgets) {
              let totalExpense = 0;
              props.expense[category].map((item) => {
                totalExpense += item.amount;
              });
              const object = {};
              const ratio = ((totalExpense / budgets[category]) * 100).toFixed(
                2
              );
              object["amount"] = totalExpense;
              object["ratio"] = ratio;
              object["budget"] = budgets[category];
              object["category"] = category;
              object["left"] = budgets[category] - totalExpense;
              setBarData((prev) => Array.from([...prev, object]));
            }
          });
        });
    };
    fetchBudget();
  }, [props.expense, budget]);

  function toggleBudgetPanel() {
    setBudgetPanel(!showBudgetPanel);
  }

  return (
    <div
      className="flex-container"
      style={{ height: "80vh", overflowY: "scroll" }}
    >
      <div
        className="setBudgetButton flex-container mt-5"
        style={{ padding: "5px", width: "70%", margin: "0 auto" }}
      >
        <div>
          <BarPanel barData={barData} />
        </div>
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
