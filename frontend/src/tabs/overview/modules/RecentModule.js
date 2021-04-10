import React from "react";
import propTypes from "prop-types";
import Transaction from "../../../shared/Transaction";

export default function RecentModule(props) {
  return (
    <div
      className="flex-container border d-flex flex-column"
      style={{ overflowX: "hidden" }}
    >
      <div className="border-bottom py-2 px-3 fw-light">Recent</div>
      <div className="d-flex flex-grow-1" style={{ width: "120%" }}>
        <div
          className="row mx-3 align-self-center"
          style={{
            height: "calc((100vh - 9rem) / 2 - 5rem)",
            width: "100%",
            overflowY: "auto",
          }}
        >
          <div>
            {props.recent.slice(0, 10).map((i, index) => (
              <Transaction
                key={"RecentModule-" + index}
                _id={i._id}
                category={i.category}
                amount={parseFloat(i.amount)}
                date={i.date}
                merchant={i.merchant}
                type={i.type}
                recent={props.recent}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

RecentModule.propTypes = {
  recent: propTypes.array.isRequired,
};
