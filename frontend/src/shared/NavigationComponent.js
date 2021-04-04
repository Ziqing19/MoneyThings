import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Logout from "./auth/Logout.js";
import * as utils from "../utils.js";
import logo from "../image/MoneyEmoji.png";

export default function NavigationComponent() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    utils.getUser().then((user) => {
      setUser(user);
    });
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          ></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                MoneyThings
              </Link>
            </li>

            <li className="nav-item dropdown d-flex">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome, {user === undefined ? "Visitor" : user.username}
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/auth/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/auth">
                    Logout
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/auth/new-password">
                    Reset Password
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
