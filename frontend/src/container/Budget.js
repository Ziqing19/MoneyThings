import React from "react";
import propTypes from "prop-types";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Budget(props) {
  function setBudget() {}
  const currentExpenses = props.expense;
  const budget = 1000;
  const barData = [];
  Object.keys(currentExpenses).map((item) => {
    currentExpenses[item].map((item) => {
      const ratio = (item.amount / budget) * 100;
      const obj = {
        amount: item.amount,
        ratio: ratio,
        budget: budget,
      };
      barData.push(obj);
    });
  });

  function getVariant(ratio) {
    if (ratio < 25) {
      return "success";
    }

    if (ratio < 50) {
      return "info";
    }

    if (ratio < 75) {
      return "warning";
    }

    return "danger";
  }

  barData.forEach((item, index) => {
    console.log(item, index);
  });

  return (
    <div className="flex-container">
      <div className="ProgessBar flex-column align-items-center .ml-1">
        {barData.forEach((item) => {
          return (
            <div>
              <ProgressBar
                now={item.amount}
                variant={getVariant(item.ratio)}
                label={`${(item.amount / budget).toFixed(2) * 100}%`}
                max={budget}
              />
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={setBudget}>
          <i className="fas fa-plus fa-2x" />
        </button>
        Add expense budget
      </div>
    </div>
  );
}

Budget.propTypes = {
  expense: propTypes.object.isRequired,
  dateGroup: propTypes.object.isRequired,
};
