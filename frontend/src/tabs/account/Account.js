import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NewPassword from "./NewPassword";
import Profile from "./Profile";
import Categories from "./Categories";
import propTypes from "prop-types";

export default function Account(props) {
  console.log(props.user);
  const history = useHistory();
  return (
    <div className="container flex-container row mx-auto">
      <div className="col-3 px-0 border-end position-relative">
        <div className="d-flex align-items-start position-absolute start-50 top-50 translate-middle">
          <div className="nav flex-column nav-pills mb-5">
            <button
              className="nav-link active"
              data-bs-toggle="pill"
              onClick={() => {
                history.push("/account/profile");
              }}
            >
              Profile
            </button>
            <button
              className="nav-link"
              data-bs-toggle="pill"
              onClick={() => {
                history.push("/account/categories");
              }}
            >
              Categories
            </button>

            <button
              className="nav-link text-nowrap"
              data-bs-toggle="pill"
              onClick={() => {
                history.push("/account/new-password");
              }}
            >
              New Password
            </button>
          </div>
        </div>
      </div>
      <div className="col-9 px-0">
        <Switch>
          <Route path="/account/categories">
            <Categories {...props} />
          </Route>
          <Route path="/account/new-password">
            <div className="position-relative">
              <div className="position-absolute top-50 start-50 translate-middle">
                <NewPassword />
              </div>
            </div>
          </Route>
          <Route path="/account">
            <Profile {...props} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

Account.propTypes = {
  user: propTypes.object.isRequired,
  refreshPage: propTypes.func.isRequired,
};
