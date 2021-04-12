import React, { useState } from "react";
import propTypes from "prop-types";
import Accordion from "./Accordion";
import "../../stylesheets/AllTime.css";

export default function AllTime(props) {
  const [isGroupByDate, setIsGroupByDate] = useState(true);

  function groupByDate() {
    if (props.dateGroup.length === 0) return null;
    return (
      <table className="table table-striped">
        <tbody className="accordion accordion-flush">
          {Object.keys(props.dateGroup).map((key) => (
            <tr key={"date-accordion-" + key}>
              <Accordion
                header={key}
                transactions={props.dateGroup[key]}
                recent={props.recent}
                setRecent={props.setRecent}
                refreshPage={props.refreshPage}
              />
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function groupByCategory(type, header) {
    if (Object.keys(type).length === 0) return null;
    return (
      <table className="table table-striped">
        <h3 className="text-end mb-3" style={{ color: "rgba(0,0,0,0.8)" }}>
          {header}
        </h3>
        <tbody className="accordion accordion-flush">
          {Object.keys(type).map((key) => (
            <tr key={"category-accordion-" + key}>
              <Accordion
                header={key}
                transactions={type[key]}
                recent={props.recent}
                setRecent={props.setRecent}
                refreshPage={props.refreshPage}
              />
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="position-relative" style={{ height: "calc(100vh - 6rem)" }}>
      <div
        className="hide-scroll"
        style={{ maxHeight: "100%", overflow: "auto" }}
      >
        <div className="border-bottom py-3 px-5 d-flex">
          <div className="me-auto">
            <div className="form-check form-switch mb-0 mt-1">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={() => setIsGroupByDate(!isGroupByDate)}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                GROUP BY CATEGORY/DATE
              </label>
            </div>
          </div>
          <div className="text-end" style={{ fontSize: "20px" }}>
            Current Balance: {parseFloat(props.user.balance).toFixed(2)}
          </div>
        </div>
        <div className="pt-3">
          {isGroupByDate ? (
            <div className="ms-4 me-5 mt-3">{groupByDate()}</div>
          ) : (
            <div className="ms-4 me-5">
              <div className="mb-5">
                {groupByCategory(props.income, "Income")}
              </div>
              <div>{groupByCategory(props.expense, "Expense")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AllTime.propTypes = {
  user: propTypes.object.isRequired,
  refreshPage: propTypes.func.isRequired,
  recent: propTypes.array.isRequired,
  setRecent: propTypes.func.isRequired,
  income: propTypes.object.isRequired,
  expense: propTypes.object.isRequired,
  dateGroup: propTypes.object.isRequired,
};
