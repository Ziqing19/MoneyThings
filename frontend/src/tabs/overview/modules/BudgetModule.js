import React from "react";
import { useState, useEffect } from "react";
//import ProgressBar from "react-bootstrap/ProgressBar";
import propTypes from "prop-types";
import Budget from "../../budget/Budget.js";

export default function BudgetModule(props) {
  const [expense, setExpense] = useState({});
  useEffect(() => {
    setExpense({});
    for (var i = 0; i < props.recent.length; i++) {
      if (props.recent[i].type == "Expense") {
        let category = props.recent[i].category;
        const array = props.recent.filter((item) => item.category === category);
        if (array.length === 0) continue;
        setExpense((prev) => ({ ...prev, [category]: array }));
      }
    }
  }, [props.recent]);
  console.log("expense", expense);
  return (
    <div className="flex-container border d-flex flex-column">
      <div className="border-bottom py-2 px-3 fw-light">Budget</div>
      <div className="d-flex flex-grow-1" style={{ width: "100%" }}></div>
      <div
        className="row mx-3 align-self-center"
        style={{
          height: "calc((100vh - 9rem) / 2 - 5rem)",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Budget expense={expense} />
      </div>
    </div>
  );
}

BudgetModule.propTypes = {
  recent: propTypes.array.isRequired,
};
