import React from "react";
import "./stylesheet/SelectionPanel.css";
import NewTransaction from "./NewTransaction";

export default function SelectionPanel() {
  function handleClick() {
    console.log("click");
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
        <NewTransaction />
      </div>
    </div>
  );
}
