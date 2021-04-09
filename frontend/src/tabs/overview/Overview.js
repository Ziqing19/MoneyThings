import React from "react";

export default function Overview() {
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
      overview
      <button
        onClick={() => {
          fetch("/transaction/cal-balance")
            .then((res) => res.json())
            .then(console.log);
        }}
      >
        cal balance
      </button>
      <button onClick={getAll}>classify all transaction categories</button>
    </div>
  );
}
