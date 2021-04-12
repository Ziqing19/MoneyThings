import React from "react";
import { useState, useEffect } from "react";
import propTypes from "prop-types";
import BarPanel from "../../budget/barPanel.js";

export default function BudgetModule(props) {
  const [expense, setExpense] = useState({});
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    setExpense({});
    for (var i = 0; i < props.recent.length; i++) {
      if (props.recent[i].type === "Expense") {
        let category = props.recent[i].category;
        const array = props.recent.filter((item) => item.category === category);
        if (array.length === 0) continue;
        setExpense((prev) => ({ ...prev, [category]: array }));
      }
    }
  }, [props.recent]);

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
        Object.keys(expense).map((category) => {
          if (category in budgets) {
            let totalExpense = 0;
            expense[category].map((item) => {
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
  }, [expense]);

  return (
    <div className="flex-container border d-flex flex-column">
      <div className="border-bottom py-2 px-3 fw-light">Budget</div>
      <div
        className="row mt-4 mx-3 align-self-center hide-scroll"
        style={{
          height: "calc((100vh - 9rem) / 2 - 5rem)",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <BarPanel barData={barData} />
      </div>
    </div>
  );
}

BudgetModule.propTypes = {
  recent: propTypes.array.isRequired,
};
