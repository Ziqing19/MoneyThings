import React from "react";

export default function AllTime() {
  function getAll() {
    fetch("/transaction/get-all")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let array = new Array(res.map((item) => item.category))[0];
        const result = {};
        for (let i = 0; i < array.length; i++) {
          result[array[i]] = (result[array[i]] || 0) + 1;
        }
        Object.keys(result).map((key) => ({ [key]: result[key] }));
        console.log(Object.keys(result));
        console.log(result);
      });
  }

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
      <button onClick={getAll}>get all</button>
    </div>
  );
}
