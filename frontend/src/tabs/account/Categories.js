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
      setIncomeCategory(props.user.categories["Income"][0]);
      setExpenseCategory(props.user.categories["Expense"][0]);
    }
  }, [props.user]);

  function handleDeleteCategory(type, category) {
    const data = {
      type: type,
      category: category,
    };
    fetch("/user/delete-category", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resRaw) => {
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            alert(res);
          });
        } else {
          console.log("Category deleted");
          props.refreshPage((prev) => !prev);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleCreateCategory(type, category) {
    if (category.length === 0) {
      return alert("Category name cannot be empty");
    }
    const data = {
      type: type,
      category: category,
    };
    fetch("/user/create-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resRaw) => {
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            alert(res);
          });
        } else {
          console.log("New category created");
          props.refreshPage((prev) => !prev);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

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
              <button
                className="btn btn-danger"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleDeleteCategory("Income", incomeCategory);
                }}
              >
                Delete
              </button>
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
              <button
                className="btn btn-danger"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleDeleteCategory("Expense", expenseCategory);
                }}
              >
                Delete
              </button>
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
              <button
                className="btn btn-outline-secondary"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleCreateCategory(createType, createCategory);
                }}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Categories.propTypes = {
  user: propTypes.object.isRequired,
  refreshPage: propTypes.func.isRequired,
};
