import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import propTypes from "prop-types";

export default function ProfileModule(props) {
  const [balanceVisibility, setBalanceVisibility] = useState(false);

  function getTime() {
    const hour = new Date().getHours();
    if (hour > 17) {
      return "Evening";
    } else if (hour > 11) {
      return "Afternoon";
    } else if (hour > 5) {
      return "Morning";
    } else {
      return "Night";
    }
  }

  function toggleBalance() {
    setBalanceVisibility(!balanceVisibility);
  }

  return (
    <div className="flex-container border d-flex flex-column">
      <div className="border-bottom py-2 px-3 fw-bold text-black-50">
        Profile
      </div>
      <div className="d-flex flex-grow-1">
        <div className="row mx-3 align-self-center">
          <div className="col-4 px-0">
            <div className="ratio ratio-1x1">
              <img
                src={`../images/avatar/${props.user.avatar}.png`}
                alt="avatar"
              />
            </div>
          </div>
          <div className="col-8 align-self-center">
            <h3 className="mb-3">
              Good {getTime()}, {props.user.username}
            </h3>
            <h5 className="d-flex me-4">
              Your Balance:{" "}
              {balanceVisibility
                ? parseFloat(props.user.balance).toFixed(2)
                : "*"}
              <span className="ms-auto" onClick={toggleBalance}>
                {balanceVisibility ? (
                  <FontAwesomeIcon icon={["far", "eye-slash"]} />
                ) : (
                  <FontAwesomeIcon icon={["far", "eye"]} />
                )}
              </span>
            </h5>
          </div>
          <div className="fw-lighter mb-1 mt-4">Biography</div>
          <h5 className="fst-italic">{props.user.biography}</h5>
        </div>
      </div>
    </div>
  );
}

ProfileModule.propTypes = {
  user: propTypes.object.isRequired,
};
