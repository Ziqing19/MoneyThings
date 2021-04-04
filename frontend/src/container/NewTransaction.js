import React, { useState } from "react";
import InputBox from "../shared/InputBox.js";

export default function NewTransaction() {
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [remark, setRemark] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
  }

  return (
    <div className="flex-container">
      <form onSubmit={handleSubmit}>
        <div className="row py-3 border-bottom text-center">
          <div className="col-3 border-end">Cancel</div>
          <div className="col-3 border-end">Income</div>
          <div className="col-3 border-end">Expense</div>
          <div className="col-3">Save</div>
        </div>
        {/*TODO make category a multiple choice selection*/}
        <InputBox
          label="Category"
          value={category}
          onChange={(evt) => setCategory(evt.target.value)}
          required={true}
        />
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
          onChange={(evt) => setAmount(evt.target.value)}
          required={true}
        />
        <InputBox
          label="Date"
          value={date}
          onChange={(evt) => setDate(evt.target.value)}
          required={true}
        />
        <InputBox
          label="Remark"
          value={remark}
          onChange={(evt) => setRemark(evt.target.value)}
        />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
