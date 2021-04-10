import React, { useState } from "react";
import InputBox from "../../shared/InputBox.js";
import propTypes from "prop-types";

export default function SetBudget(props) {
  const [amount, setAmount] = useState(0);
  const [categories] = useState(props.user.categories.Expense);
  const [category, setCategory] = useState(props.user.categories.Expense[0]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }

    const data = {
      category: category,
      amount: amount,
    };
    console.log(data);
    fetch("");
  }

  return (
    <div className="flex-container">
      <form onSubmit={handleSubmit}>
        <div className="row text-center">
          <button className="col-3" onClick={props.toggle}>
            Cancel
          </button>
          <div className="col-6"></div>
          <button className="col-3">Save</button>
        </div>
      </form>

      <div className="form-floating my-3">
        <select
          className="form-select"
          id="select"
          value={category}
          onChange={(evt) => {
            setCategory(evt.target.value);
          }}
        >
          {categories.map((item, index) => (
            <option value={item} key={"option-" + index}>
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="select">Category</label>
      </div>

      <InputBox
        label="Budget"
        value={amount}
        type="number"
        onChange={(evt) => setAmount(evt.target.value)}
        required={true}
      />
    </div>
  );
}

SetBudget.propTypes = {
  user: propTypes.object.isRequired,
  setUser: propTypes.func.isRequired,
  toggle: propTypes.func.isRequired,
};
