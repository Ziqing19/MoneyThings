import React, { useState } from "react";
import Transaction from "./Transaction";
import { useRouteMatch } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import DatePicker from "react-date-picker";
import propTypes from "prop-types";

export default function RecentTransaction(props) {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(new Date());
  const totalPages = Math.ceil(props.recent.length / 5);
  const match = useRouteMatch("/all-time");

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

  function AllTimeShortcuts() {
    return (
      <div>
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
    );
  }

  function handleDateChange(evt) {
    setDate(evt);
    props.setDateRange(getMonthRange(evt));
  }

  return (
    <div className="flex-container">
      <div className="py-3">
        <div>
          {match ? (
            <DateRangePicker
              onChange={props.setDateRange}
              value={props.dateRange}
              clearIcon={null}
              minDate={new Date(0)}
              maxDate={new Date()}
            />
          ) : (
            <DatePicker
              onChange={handleDateChange}
              value={date}
              clearIcon={null}
              maxDetail="year"
              minDate={new Date(0)}
              maxDate={new Date()}
            />
          )}
        </div>
        <div>{match ? AllTimeShortcuts() : null}</div>
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
          key={"RecentTransaction-" + index}
          _id={i._id}
          category={i.category}
          amount={parseFloat(i.amount)}
          date={i.date}
          merchant={i.merchant}
          type={i.type}
          recent={props.recent}
          setRecent={props.setRecent}
          setUser={props.setUser}
        />
      ))}
    </div>
  );
}

RecentTransaction.propTypes = {
  setUser: propTypes.func.isRequired,
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
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return [date, new Date()];
}

function getMonthRange(start_date) {
  const year = start_date.getFullYear();
  const month = start_date.getMonth();
  const end_date = new Date(year, month + 1, 0);
  end_date.setHours(23);
  end_date.setMinutes(59);
  end_date.setSeconds(59);
  return [start_date, new Date(end_date)];
}
