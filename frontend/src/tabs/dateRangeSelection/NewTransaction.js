import React, { useState } from "react";
import InputBox from "../../shared/InputBox.js";
import propTypes from "prop-types";
import DateTimePicker from "react-datetime-picker";
import _ from "lodash";

export default function NewTransaction(props) {
  const [isIncome, setIsIncome] = useState(true);
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState(props.user.categories.Income);
  const [category, setCategory] = useState(props.user.categories.Income[0]);
  const [remark, setRemark] = useState("");
  const [date, setDate] = useState(new Date());

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    const data = {
      type: isIncome ? "Income" : "Expense",
      category: category,
      merchant: merchant,
      amount: amount,
      date: date.getTime(),
      remark: remark,
    };
    fetch("/transaction/new", {
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
          const newDateRange = _.cloneDeep(props.dateRange);
          newDateRange[1] = new Date();
          props.setDateRange(newDateRange);
          props.toggle();
          props.refreshPage((prev) => !prev);
          console.log("New transaction created");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  function notIsIncome(flag) {
    setIsIncome(flag);
    setCategories(
      isIncome ? props.user.categories.Expense : props.user.categories.Income
    );
  }

  return (
    <div className="flex-container">
      <form
        onSubmit={handleSubmit}
        className="flex-container d-flex flex-column"
      >
        <div className="row py-3 text-center btn-group mx-3" role="group">
          <button
            className="col-3 border-end btn btn-secondary"
            onClick={props.toggle}
          >
            Cancel
          </button>

          <button
            className="col-3 border-end btn btn-secondary"
            onClick={() => notIsIncome(true)}
            style={{
              textDecoration: isIncome ? "underline" : "none",
            }}
          >
            Income
          </button>
          <button
            className="col-3 border-end btn btn-secondary"
            onClick={() => notIsIncome(false)}
            style={{ textDecoration: isIncome ? "none" : "underline" }}
          >
            Expense
          </button>
          <button className="col-3 btn btn-secondary">Save</button>
        </div>
        <div className="text-center my-3">
          <DateTimePicker onChange={setDate} value={date} clearIcon={null} />
        </div>
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
          label="Merchant name"
          value={merchant}
          onChange={(evt) => setMerchant(evt.target.value)}
          required={true}
          feedback="Please enter the merchant name"
        />
        <InputBox
          label="Amount"
          value={amount}
          type="number"
          onChange={(evt) => setAmount(evt.target.value)}
          required={true}
        />
        <div className="form-floating mt-3 mb-5 flex-grow-1">
          <textarea
            id="remark"
            value={remark}
            className="form-control"
            placeholder="textarea"
            onChange={(evt) => setRemark(evt.target.value)}
            style={{ height: "100%" }}
          />
          <label htmlFor="remark">Remark</label>
        </div>
      </form>
    </div>
  );
}

NewTransaction.propTypes = {
  user: propTypes.object.isRequired,
  refreshPage: propTypes.func.isRequired,
  toggle: propTypes.func.isRequired,
  dateRange: propTypes.array.isRequired,
  setDateRange: propTypes.func.isRequired,
};
