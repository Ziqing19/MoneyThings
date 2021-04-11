import React, { useState } from "react";
import InputBox from "../../shared/InputBox.js";
import propTypes from "prop-types";

export default function SetBudget(props) {
  const [amount, setAmount] = useState("0");
  const [categories] = useState(props.user.categories.Expense);
  const [category, setCategory] = useState(props.user.categories.Expense[0]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    const data = {
      category: category,
      amount: parseFloat(amount),
    };
    fetch("/user/update-budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resRaw) => {
        console.log(resRaw);
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            alert(res);
          });
        } else {
          props.toggle();
          props.setBudget(data);
          console.log("New budget created");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="flex-container">
      <form onSubmit={handleSubmit}>
        <div className="row text-center" style={{ margin: "10px 0px" }}>
          <button className="col-3 btn btn-secondary" onClick={props.toggle}>
            Cancel
          </button>
          <div className="col-6"></div>
          <button
            className="col-3 btn btn-secondary"
            onClick={(evt) => {
              handleSubmit(evt);
            }}
          >
            Save
          </button>
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
  setBudget: propTypes.func.isRequired,
};
