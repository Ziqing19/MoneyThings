import React from "react";
import ProfileModule from "./modules/ProfileModule";
import BudgetModule from "./modules/BudgetModule";
import ChartModule from "./modules/ChartModule";
import RecentModule from "./modules/RecentModule";
import "../../stylesheets/Overview.css";
import propTypes from "prop-types";

export default function Overview(props) {
  return (
    <div className="flex-container container">
      <div className="flex-container row">
        <div className="col-6 module">
          <ProfileModule {...props} />
        </div>
        <div className="col-6 module">
          <RecentModule />
        </div>
        <div className="col-6 module">
          <ChartModule />
        </div>
        <div className="col-6 module">
          <BudgetModule />
        </div>
      </div>
    </div>
  );
}

Overview.propTypes = {
  user: propTypes.object.isRequired,
};

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
