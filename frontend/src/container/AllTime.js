import React from "react";

export default function AllTime(props) {
  console.log(props);
  return (
    <div style={{height: "100%"}}>
      <div className="text-end border-bottom py-3 pe-5">
        Current Balance: {"$100"}
      </div>
    </div>
  );
}