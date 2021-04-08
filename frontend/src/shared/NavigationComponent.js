import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../image/MoneyEmoji.png";

export default function NavigationComponent(props) {
  async function logout() {
    document.cookie = "_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    const resRaw = await fetch("/user/logout");
    if (!resRaw.ok) {
      const res = await resRaw.text();
      alert(res);
    }
    window.location = "/auth/login";
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid d-flex">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top me-2"
          />
          MoneyThings
        </Link>
        {!props.user ? (
          <div className="nav-link">Welcome, Visitor</div>
        ) : (
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarScroll"
          >
            <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item dropdown d-flex">
                <div
                  className="nav-link dropdown-toggle"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome, {props.user.username}
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/account">
                      Manage Account
                    </Link>
                  </li>
                  <li>
                    <div className="dropdown-item" onClick={logout}>
                      Logout
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

NavigationComponent.propTypes = {
  user: PropTypes.object,
};
