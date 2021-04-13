import React from "react";

export default function Instruction() {
  return (
    <div
      className="modal fade"
      id="instruction_modal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Instruction
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="fw-bold">Overview</div>
            <div className="mb-3">
              The overview tab displays your transaction data and charts within
              this month.
            </div>
            <div className="fw-bold">All Time</div>
            <div className="mb-3">
              In the all time tab there are two parts. The left part allows you
              to choose a date range and retrieve transaction within that. At
              the right side there is a detailed view of those data, grouped by
              either categories or dates. You might also all a new transaction
              by clicking the PLUS icon.
            </div>
            <div className="fw-bold">Trend</div>
            <div className="mb-3">
              The trend tab displays your monthly data in charts. Your can check
              your income and expense by a pie chart of different categories, or
              daily data by a line chart.
            </div>
            <div className="fw-bold">Budget</div>
            <div className="mb-3">
              Set your monthly budget for better management of your money!
            </div>
            <div className="fw-bold">Account</div>
            <div className="mb-3">
              Set your personal information like your avatar, your password, or
              your favorite biography.
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
