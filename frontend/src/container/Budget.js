import React from "react";
import propTypes from "prop-types";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Budget(props) {
  function setBudget() {}
  const currentExpenses = props.expense;
  const budget = 500;
  const barData = [];
  // console.log(currentExpenses);
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
