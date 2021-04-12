import React, { useState, useEffect } from "react";
import Transaction from "../../shared/Transaction";
import { useRouteMatch } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import DatePicker from "react-date-picker";
import propTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import "../../stylesheets/datePicker.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
//import ListGroup from "react-bootstrap/ListGroup";

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
        <ButtonGroup>
          <Button
            variant="info"
            onClick={() => {
              props.setDateRange(getToday());
            }}
          >
            Today
          </Button>
          <Button
            variant="info"
            onClick={() => {
              props.setDateRange(getLastWeek());
            }}
          >
            Last Week
          </Button>
          <Button
            variant="info"
            onClick={() => {
              props.setDateRange(getLastMonth());
            }}
          >
            Last Month
          </Button>
          <Button
            variant="info"
            onClick={() => {
              props.setDateRange(getLastYear());
            }}
          >
            Last Year
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  function handleDateChange(date) {
    console.log("Data change to", getMonthRange(date));
    setDate(date);
    setPage(1);
    props.setDateRange(getMonthRange(date));
  }

  function handleDateRangeChange(dateRange) {
    setPage(1);
    props.setDateRange(dateRange);
  }

  useEffect(() => {
    if (!match) {
      setDate(new Date());
      setPage(1);
      props.setDateRange(getLastMonth(new Date()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match === null]);

  return (
    <div className="flex-container">
      <div className="row">
        <div>
          {match ? (
            <DateRangePicker
              onChange={handleDateRangeChange}
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
      <div style={{ marginTop: "20px" }}>
        <ul className="list-group list-group-flush">
          {props.recent.slice(page * 4 - 4, page * 4).map((i, index) => (
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
              refreshPage={props.refreshPage}
            />
          ))}
        </ul>
      </div>
      <div
        className="row btn-group d-flex justify-content-center"
        role="group"
        aria-label="page navigation buttoon"
        style={{
          margin: "10px 0px",
        }}
      >
        <button className="col-3 btn btn-secondary" onClick={prevPage}>
          Prev
        </button>
        <div className="col-6 text-center">
          Page {page}/{totalPages}
        </div>
        <button className="col-3 btn btn-secondary" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

RecentTransaction.propTypes = {
  refreshPage: propTypes.func.isRequired,
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
  start_date.setDate(1);
  start_date.setHours(0);
  start_date.setMinutes(0);
  start_date.setSeconds(0);
  end_date.setHours(23);
  end_date.setMinutes(59);
  end_date.setSeconds(59);
  return [start_date, end_date];
}
