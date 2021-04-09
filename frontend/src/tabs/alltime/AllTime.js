import React, { useState } from "react";
import propTypes from "prop-types";
import Accordion from "./Accordion";

export default function AllTime(props) {
  const [isGroupByDate, setIsGroupByDate] = useState(true);

  function groupByDate() {
    if (props.dateGroup.length === 0) return null;
    return (
      <div className="mb-3">
        {Object.keys(props.dateGroup).map((key) => (
          <Accordion
            header={key}
            key={"date-accordion-" + key}
            transactions={props.dateGroup[key]}
            recent={props.recent}
            setRecent={props.setRecent}
            refreshPage={props.refreshPage}
          />
        ))}
      </div>
    );
  }

  function groupByCategory(type, header) {
    if (Object.keys(type).length === 0) return null;
    return (
      <div className="mb-3">
        <h3 className="text-end me-5">{header}</h3>
        <hr className="mb-3" />
        {Object.keys(type).map((key) => (
          <Accordion
            header={key}
            key={"category-accordion-" + key}
            transactions={type[key]}
            recent={props.recent}
            setRecent={props.setRecent}
            refreshPage={props.refreshPage}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="position-relative" style={{ height: "calc(100vh - 6rem)" }}>
      <div style={{ maxHeight: "100%", overflow: "auto" }}>
        <div className="text-end border-bottom py-3 pe-5">
          Current Balance: {parseFloat(props.user.balance).toFixed(2)}
        </div>
        <div>
          <button
            onClick={() => {
              setIsGroupByDate(true);
            }}
          >
            group by date
          </button>
          <button
            onClick={() => {
              setIsGroupByDate(false);
            }}
          >
            group by category
          </button>
        </div>
        {isGroupByDate ? (
          <div>{groupByDate()}</div>
        ) : (
          <div>
            {groupByCategory(props.income, "Income")}
            {groupByCategory(props.expense, "Expense")}
          </div>
        )}
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
