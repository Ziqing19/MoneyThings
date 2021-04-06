import React, { useState } from "react";
import Transaction from "./Transaction";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import propTypes from "prop-types";

export default function RecentTransaction(props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(props.recent.length / 5);

  function prevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <div className="flex-container">
      <div className="py-3">
        <DateRangePicker
          onChange={props.setDateRange}
          value={props.dateRange}
        />
        <button
          onClick={() => {
            props.setDateRange(getToday());
          }}
        >
          Today
        </button>
        <button
          onClick={() => {
            props.setDateRange(getLastWeek());
          }}
        >
          Last Week
        </button>
        <button
          onClick={() => {
            props.setDateRange(getLastMonth());
          }}
        >
          Last Month
        </button>
        <button
          onClick={() => {
            props.setDateRange(getLastYear());
          }}
        >
          Last Year
        </button>
      </div>
      <div className="py-3 row">
        <button className="col" onClick={prevPage}>
          Prev
        </button>
        <div className="col text-center">
          Page {page}/{totalPages}
        </div>
        <button className="col" onClick={nextPage}>
          Next
        </button>
      </div>
      {props.recent.slice(page * 5 - 5, page * 5).map((i, index) => (
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
  );
}

RecentTransaction.propTypes = {
  dateRange: propTypes.array.isRequired,
  setDateRange: propTypes.func.isRequired,
  recent: propTypes.array.isRequired,
  setRecent: propTypes.func.isRequired,
};

function getToday() {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return [date, new Date()];
}

function getLastWeek() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return [date, new Date()];
}

function getLastMonth() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return [date, new Date()];
}

function getLastYear() {
  let date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return [date, new Date()];
}
