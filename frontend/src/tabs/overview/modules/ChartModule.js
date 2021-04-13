import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import LineChartModule from "../../../shared/LineChartModule";

export default function ChartModule(props) {
  const [dateGroup, setDateGroup] = useState({});

  useEffect(() => {
    setDateGroup({});
    const dateArray = [
      ...new Set(
        props.recent.map((item) => new Date(item.date).toDateString())
      ),
    ];
    for (let date of dateArray) {
      const array = props.recent.filter(
        (item) => new Date(item.date).toDateString() === date
      );
      setDateGroup((prev) => ({ ...prev, [date]: array }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.recent]);

  return (
    <div className="flex-container border d-flex flex-column">
      <div className="border-bottom py-2 px-3 fw-bold text-black-50">Chart</div>
      <div className="d-flex flex-grow-1 pb-3">
        <LineChartModule data={dateGroup} interval="3" />
      </div>
    </div>
  );
}

ChartModule.propTypes = {
  recent: propTypes.array.isRequired,
};
