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

  // function getAll() {
  //   fetch("/transaction/get-all")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       let array = new Array(res.map((item) => item.category))[0];
  //       const result = {};
  //       for (let i = 0; i < array.length; i++) {
  //         result[array[i]] = (result[array[i]] || 0) + 1;
  //       }
  //       Object.keys(result).map((key) => ({ [key]: result[key] }));
  //       console.log(result);
  //     });
  // }

  // function update() {
  //   fetch("/transaction/update").then(getAll);
  // }

  return (
    <div className="flex-container">
      <form onSubmit={handleSubmit}>
        <div className="row py-3 border-bottom text-center">
          <div className="col-3 border-end">Cancel</div>
          <div className="col-3 border-end">Income</div>
          <div className="col-3 border-end">Expense</div>
          <button className="col-3">Save</button>
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
        <div className="form-floating my-3">
          <textarea
            id="remark"
            rows="5"
            value={remark}
            className="form-control"
            placeholder="textarea"
            onChange={(evt) => setRemark(evt.target.value)}
            style={{ height: "auto" }}
          />
          <label htmlFor="remark">Remark</label>
        </div>
      </form>
      {/*<button onClick={getAll}>get all</button>*/}
      {/*<button onClick={update}>update</button>*/}
    </div>
  );
}
