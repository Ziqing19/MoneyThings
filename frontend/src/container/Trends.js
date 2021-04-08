import React, { useState } from "react";
import MyPie from "../shared/Pie";
import MyLineChart from "../shared/LineChart";
import propTypes from "prop-types";

export default function Trends(props) {
  const [content, setContent] = useState("expense");

  function typeData(type) {
    if (Object.keys(type).length === 0) return [];
    const data = [];
    let totalExpense = 0;
    Object.keys(type).map((item) => {
      type[item].map((item) => {
        totalExpense += item.amount;
      });
    });
    Object.keys(type).map((item) => {
      const object = {};
      const r = (Math.random() * 255).toFixed(0);
      const g = (Math.random() * 255).toFixed(0);
      const b = (Math.random() * 255).toFixed(0);
      let value = 0;
      type[item].map((item) => {
        value += item.amount;
      });

      object["value"] = (value / totalExpense).toFixed(2);
      object["id"] = item;
      object["label"] = item;
      object["color"] = `rgb(${r}, ${g}, ${b})`;
      data.push(object);
    });

    return data;
  }

  function dateData() {
    const data = [
      {
        id: "Expense",
        data: [],
      },
      {
        id: "Income",
        data: [],
      },
    ];
    if (Object.keys(props.dateGroup).length !== 0) {
      Object.keys(props.dateGroup).map((key) => {
        const items = props.dateGroup[key];
        for (let i = 0; i < items.length; i++) {
          try {
            const item = items[i];
            const type = item.type === "Expense" ? 0 : 1;
            const amount = item.amount;
            let dateString = new Date(item.date);
            dateString = new Date(
              dateString.getTime() - dateString.getTimezoneOffset() * 60000
            )
              .toISOString()
              .slice(0, 10);
            let exist = false;
            for (let cor of data[type].data) {
              if (cor.x === dateString) {
                cor.y += amount;
                exist = true;
                break;
              }
            }
            if (!exist) {
              data[type].data.push({ x: dateString, y: amount });
            }
          } catch (err) {
            // initial date range might cross two months
            console.log(err);
            void 0;
          }
        }
      });
    }
    const dummyData = [
      data[0],
      {
        id: "Income",
        data: [],
      },
    ];
    return [data, dummyData];
  }

  return (
    <div className="flex-container">
      <div style={{ height: "calc(100vh - 6rem)" }}>
        <div>
          <button
            onClick={() => {
              setContent("income");
            }}
          >
            Show Income Category Pie
          </button>
          <button
            onClick={() => {
              setContent("expense");
            }}
          >
            Show Expense Category Pie
          </button>
          <button
            onClick={() => {
              setContent("dateGroup");
            }}
          >
            Show Daily Line Chart
          </button>
        </div>
        <div style={{ height: "70%", marginTop: "5%" }}>
          {content === "dateGroup" ? (
            <div style={{ height: "100%", position: "relative" }}>
              <div style={{ height: "100%" }}>
                <MyLineChart data={dateData()[1]} isPrimaryGraph={false} />
              </div>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                }}
              >
                <MyLineChart data={dateData()[0]} isPrimaryGraph={true} />
              </div>
            </div>
          ) : (
            <MyPie data={typeData(props[content])} />
          )}
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

// const color = "rgb(215,119,103)";
// const color = "rgb(220,192,163)";
