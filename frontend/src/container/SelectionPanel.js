import React, { useState } from "react";
import "./stylesheet/SelectionPanel.css";
import NewTransaction from "./NewTransaction";
import RecentTransaction from "./RecentTransaction";
import propTypes from "prop-types";

export default function SelectionPanel(props) {
  const [showNewTrans, setShowNewTrans] = useState(false);

  function handleClick() {
    setShowNewTrans(~showNewTrans);
  }

  return (
    <div className="border-end flex-container">
      <div className="text-center border-bottom py-3 position-relative">
        Recent Transactions
        <div
          className="position-absolute top-50 translate-middle-y new-btn"
          onClick={handleClick}
        >
          <i className="fas fa-plus fa-2x" />
        </div>
      </div>
      <div id="panel_content">
        {showNewTrans ? (
          <NewTransaction />
        ) : (
          <RecentTransaction
            dateRange={props.dateRange}
            setDateRange={props.setDateRange}
            recent={props.recent}
          />
        )}
      </div>
    </div>
  );
}

SelectionPanel.propTypes = {
  dateRange: propTypes.array.isRequired,
  setDateRange: propTypes.func.isRequired,
  recent: propTypes.array.isRequired,
};
