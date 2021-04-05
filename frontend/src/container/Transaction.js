import React from "react";
import propTypes from "prop-types";

/**
 * Transaction is a pure component that represents a transaction record.
 *
 * @param props.category (required)
 * @param props.merchant (required)
 * @param props.amount (required)
 * @param props.date (required) unix timestamp
 * @returns {JSX.Element}
 */
export default function Transaction(props) {
  function parseDate(timestamp) {
    const date = new Date(timestamp);
    return date.toTimeString().split(" ")[0] + " " + date.toDateString();
  }

  return (
    <div className="mb-3">
      <div>New transaction</div>
      <ul>
        <li>{props.category}</li>
        <li>{props.merchant}</li>
        <li>{props.amount}</li>
        <li>{parseDate(props.date)}</li>
      </ul>
    </div>
  );
}

Transaction.propTypes = {
  category: propTypes.string.isRequired,
  merchant: propTypes.string.isRequired,
  amount: propTypes.number.isRequired,
  date: propTypes.number.isRequired,
};
