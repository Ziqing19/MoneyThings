import React, { useState } from "react";
import MyPie from "../../shared/Pie";
import propTypes from "prop-types";
import LineChartModule from "../../shared/LineChartModule";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Trends(props) {
  const [content, setContent] = useState("expense");

  function typeData(type) {
    if (Object.keys(type).length === 0) return [];
    const data = [];
    // let totalExpense = 0;
    // Object.keys(type).map((item) => {
    //   type[item].map((item) => {
    //     totalExpense += item.amount;
    //   });
    // });
    Object.keys(type).map((item) => {
      const object = {};
      const r = (Math.random() * 255).toFixed(0);
      const g = (Math.random() * 255).toFixed(0);
      const b = (Math.random() * 255).toFixed(0);
      let value = 0;
      type[item].map((item) => {
        value += item.amount;
      });

      object["value"] = parseFloat(value).toFixed(2);
      object["id"] = item;
      object["label"] = item;
      object["color"] = `rgb(${r}, ${g}, ${b})`;
      data.push(object);
    });

    return data;
  }

  return (
    <div className="flex-container">
      <div style={{ height: "calc(100vh - 6rem)" }} className="pt-3">
        <div className="d-flex justify-content-center me-2 mb-4 mt-3">
          <ButtonGroup>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setContent("income");
              }}
            >
              Show Income Category Pie
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setContent("expense");
              }}
            >
              Show Expense Category Pie
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setContent("dateGroup");
              }}
            >
              Show Daily Line Chart
            </button>
          </ButtonGroup>
        </div>
        <div
          className="d-flex justify-content-center me-2"
          style={{ height: "80%" }}
        >
          <div className="flex-container" style={{ width: "90%" }}>
            {content === "dateGroup" ? (
              <LineChartModule data={props.dateGroup} />
            ) : (
              <MyPie data={typeData(props[content])} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Trends.propTypes = {
  income: propTypes.object.isRequired,
  expense: propTypes.object.isRequired,
  dateGroup: propTypes.object.isRequired,
};
