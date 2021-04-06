import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import Accordion from "./Accordion";

export default function AllTime(props) {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  function categoryComponent(type, header) {
    if (Object.keys(type).length === 0) return null;
    return (
      <div className="mb-3">
        <h3 className="text-end me-5">{header}</h3>
        <hr className="mb-3" />
        {Object.keys(type).map((key) => (
          <Accordion
            header={key}
            key={"accordion-" + key}
            transactions={type[key]}
            recent={props.recent}
            setRecent={props.setRecent}
          />
        ))}
      </div>
    );
  }

  useEffect(() => {
    console.log(new Date());
    for (let category of props.user.categories["Income"]) {
      const array = props.recent.filter((item) => item.category === category);
      if (array.length === 0) continue;
      setIncome((prev) => ({ ...prev, [category]: array }));
    }
    for (let category of props.user.categories["Expense"]) {
      const array = props.recent.filter((item) => item.category === category);
      if (array.length === 0) continue;
      setExpense((prev) => ({ ...prev, [category]: array }));
    }
    console.log(income, expense);
  }, [props.recent]);

  return (
    <div className="flex-container position-relative">
      <div style={{ maxHeight: "100%", overflow: "auto" }}>
        <div className="text-end border-bottom py-3 pe-5">
          Current Balance: {props.user.balance}
        </div>
        {categoryComponent(income, "Income")}
        {categoryComponent(expense, "Expense")}
      </div>
    </div>
  );
}

AllTime.propTypes = {
  user: propTypes.object.isRequired,
  recent: propTypes.array.isRequired,
  setRecent: propTypes.func.isRequired,
};
