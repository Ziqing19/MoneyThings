import React, { useEffect, useState } from "react";
import ProfileModule from "./modules/ProfileModule";
import BudgetModule from "./modules/BudgetModule";
import ChartModule from "./modules/ChartModule";
import RecentModule from "./modules/RecentModule";
import "../../stylesheets/Overview.css";
import propTypes from "prop-types";

export default function Overview(props) {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    console.log("workspace", props.user);
    fetch("/transaction/recent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRange: [getThisMonth()[0].getTime(), getThisMonth()[1].getTime()],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setRecent(res);
      })
      .catch((err) => {
        alert(err);
      });
  }, [props.user]);

  return (
    <div className="flex-container container">
      <div className="flex-container row">
        <div className="col-6 p-3 module">
          <ProfileModule {...props} />
        </div>
        <div className="col-6 p-3 module">
          <RecentModule {...props} recent={recent} />
        </div>
        <div className="col-6 p-3 module">
          <ChartModule {...props} />
        </div>
        <div className="col-6 p-3 module">
          <BudgetModule {...props} />
        </div>
      </div>
    </div>
  );
}

Overview.propTypes = {
  user: propTypes.object.isRequired,
};

function getThisMonth() {
  const end_date = new Date();
  const start_date = new Date();
  start_date.setDate(1);
  start_date.setHours(0);
  start_date.setMinutes(0);
  start_date.setSeconds(0);
  return [start_date, end_date];
}

// function getAll() {
//   fetch("/transaction/get-all")
//     .then((res) => {
//       return res.json();
//     })
//     .then((res) => {
//       let array = new Array(res.map((item) => item.category))[0];
//       const result = {};
//       for (let i = 0; i < array.length; i++) {
//         result[array[i]] = (result[array[i]] || 0) + 1;
//       }
//       Object.keys(result).map((key) => ({ [key]: result[key] }));
//       console.log(Object.keys(result));
//       console.log(result);
//     });
// }
