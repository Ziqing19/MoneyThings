import React, { useEffect, useState } from "react";
import propTypes from "prop-types";

export default function Categories(props) {
  const [categories, setCategories] = useState({ Income: [], Expense: [] });
  const [incomeCategory, setIncomeCategory] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [createType, setCreateType] = useState("Income");
  const [createCategory, setCreateCategory] = useState("");

  useEffect(() => {
    if (props.user) {
      setCategories(props.user.categories);
    }
  }, [props.user]);

  return (
    <div className="flex-container d-flex">
      <div
        className="d-flex flex-column align-self-center mb-5"
        style={{ height: "50%", width: "100%" }}
      >
        <div className="row mt-5 mb-auto">
          <div className="col-3 ms-auto">
            <form className="my-3">
              <label className="form-label fw-light" htmlFor="select_income">
                Income Categories
              </label>
              <select
                className="form-select mb-3"
                id="select_income"
                value={incomeCategory}
                onChange={(evt) => {
                  setIncomeCategory(evt.target.value);
                }}
              >
                {categories["Income"].map((item, index) => (
                  <option key={"income-option" + index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button className="btn btn-danger">Delete</button>
            </form>
          </div>
          <div className="col-2" />
          <div className="col-3 me-auto">
            <form className="my-3">
              <label className="form-label fw-light" htmlFor="select_income">
                Expense Categories
              </label>
              <select
                className="form-select mb-3"
                id="select_expense"
                value={expenseCategory}
                onChange={(evt) => {
                  setExpenseCategory(evt.target.value);
                }}
              >
                {categories["Expense"].map((item, index) => (
                  <option key={"expense-option" + index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button className="btn btn-danger">Delete</button>
            </form>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-8 mx-auto">
            <label className="form-label fw-light">Create A New Category</label>
            <form className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Type
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                style={{ width: "20px" }}
                value={createType}
                onChange={(evt) => {
                  setCreateType(evt.target.value);
                }}
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
              <input
                className="form-control"
                style={{ flexGrow: "5" }}
                value={createCategory}
                onChange={(evt) => {
                  setCreateCategory(evt.target.value);
                }}
              />
              <button className="btn btn-outline-secondary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Categories.propTypes = {
  user: propTypes.object.isRequired,
};
