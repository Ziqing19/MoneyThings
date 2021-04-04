import React from "react";

export default function SelectionPanel(props) {
  console.log(props);
  return (
    <div className="border-end" style={{height: "100%"}}>
      <div className="text-center border-bottom py-3">
        Recent Transactions
      </div>
    </div>
  );
}