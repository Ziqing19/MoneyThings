import React from "react";

export default function AllTime() {
  return (
    <div className="flex-container">
      <div className="text-end border-bottom py-3 pe-5">
        Current Balance: {"$100"}
      </div>
      <button
        onClick={() => {
          fetch("/transaction/cal-balance").then(console.log);
        }}
      >
        cal balance
      </button>
      <button
        onClick={() => {
          fetch("/transaction/test").then(console.log);
        }}
      >
        test
      </button>
    </div>
  );
}
