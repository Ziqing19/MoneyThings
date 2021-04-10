import React from "react";
import MyLineChart from "./LineChart";
import propTypes from "prop-types";

export default function LineChartModule(props) {
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
    if (Object.keys(props.data).length !== 0) {
      Object.keys(props.data).map((key) => {
        const items = props.data[key];
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
    <div className="flex-container position-relative" style={{ width: "100%" }}>
      <div className="flex-container">
        <MyLineChart
          data={dateData()[1]}
          isPrimaryGraph={false}
          interval={props.interval}
        />
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
        <MyLineChart
          data={dateData()[0]}
          isPrimaryGraph={true}
          interval={props.interval}
        />
      </div>
    </div>
  );
}

LineChartModule.propTypes = {
  data: propTypes.object.isRequired,
  interval: propTypes.number,
};
