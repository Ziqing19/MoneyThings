import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import propTypes from "prop-types";

export default function BarPanel(props) {
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
    <div className="ProgessBar flex-column align-items-center .ml-1">
      {props.barData.map((item, index) => {
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
  );
}

BarPanel.propTypes = {
  barData: propTypes.array.isRequired,
};
