import React from "react";
import propTypes from "prop-types";
import _ from "lodash";

/**
 * Transaction is a pure component that represents a transaction record.
 *
 * @param props._id (required)
 * @param props.category (required)
 * @param props.merchant (required)
 * @param props.amount (required)
 * @param props.date (required) unix timestamp
 * @param props.type (required) expense | income
 * @returns {JSX.Element}
 */
export default function Transaction(props) {
  function parseDate(timestamp) {
    const date = new Date(timestamp);
    return date.toTimeString().split(" ")[0] + " " + date.toDateString();
  }

  function deleteTransaction() {
    if (confirm("Are you sure to delete this transaction?")) {
      fetch("/transaction/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: props._id }),
      })
        .then((resRaw) => {
          if (!resRaw.ok) {
            resRaw.text().then((res) => {
              alert(res);
            });
          } else {
            const array = _.cloneDeep(props.recent);
            for (let i = 0; i < array.length; i++) {
              if (array[i]._id === props._id) {
                array.splice(i, 1);
              }
            }
            props.setRecent(array);
            const variation = parseFloat(
              props.type === "Income" ? -props.amount : props.amount
            );
            props.setUser((prev) => ({
              ...prev,
              balance: prev.balance + variation,
            }));
            console.log("Transaction deleted");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="mb-3 position-relative">
      <button
        type="button"
        className="btn-close position-absolute end-0 translate-middle-x"
        aria-label="Close"
        onClick={deleteTransaction}
      />
      <ul>
        <li>{props.category}</li>
        <li>{props.merchant}</li>
        <li>{props.amount}</li>
        <li>{props.type}</li>
        <li>{parseDate(props.date)}</li>
      </ul>
    </div>
  );
}

Transaction.propTypes = {
  _id: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  merchant: propTypes.string.isRequired,
  amount: propTypes.number.isRequired,
  date: propTypes.number.isRequired,
  type: propTypes.string.isRequired,
  recent: propTypes.array.isRequired,
  setRecent: propTypes.func.isRequired,
  setUser: propTypes.func.isRequired,
};
