import React from "react";
import propTypes from "prop-types";
import { TiDelete } from "react-icons/ti";
import Badge from "react-bootstrap/Badge";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";

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
            props.refreshPage((prev) => !prev);
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
      <li
        className="list-group-item d-flex justify-content-between align-item-center list-group-item-light"
        style={{ "font-weight": "bold" }}
      >
        {props.merchant}
        <div>
          <Badge pill variant={props.type == "Expense" ? "danger" : "primary"}>
            ${props.amount}
          </Badge>{" "}
          {props.refreshPage !== undefined ? (
            <TiDelete size="1.5em" onClick={deleteTransaction} />
          ) : null}
        </div>
      </li>
      <li
        className="list-group-item d-flex justify-content-between align-item-center list-group-item-light"
        style={{ fontSize: "15px" }}
      >
        {props.category}
        <div style={{ fontStyle: "italic" }}>{parseDate(props.date)}</div>
      </li>
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
  setRecent: propTypes.func,
  refreshPage: propTypes.func,
};
