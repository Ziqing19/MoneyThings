import React from "react";
import propTypes from "prop-types";
import Transaction from "./Transaction";

/**
 * It represents a group of transactions.
 *
 * @param props.header
 * @param props.transactions
 * @param props.recent
 * @param props.setRecent
 * @returns {JSX.Element}
 */
export default function Accordion(props) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + props.header}
        >
          {props.header}
        </button>
      </h2>
      <div id={props.header} className="accordion-collapse collapse">
        <div className="accordion-body">
          {props.transactions.map((i, index) => (
            <Transaction
              key={index}
              _id={i._id}
              category={i.category}
              amount={parseFloat(i.amount)}
              date={i.date}
              merchant={i.merchant}
              type={i.type}
              recent={props.recent}
              setRecent={props.setRecent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Accordion.propTypes = {
  header: propTypes.string.isRequired,
  transactions: propTypes.object.isRequired,
  recent: propTypes.array.isRequired,
  setRecent: propTypes.func.isRequired,
};