import React from "react";

export default function Budget() {
  //const [dataMonth, setdataMonth] = useState(getLastMonth());

  function setBudget() {}

  return (
    <div className="flex-container">
      <button onClick={setBudget}>
        <i className="fas fa-plus fa-2x" />
      </button>
      Add expense budget
    </div>
  );
}
