import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "./images/MoneyEmoji.png";

export default function NavigationComponent(props) {
  const [avatar, setAvatar] = useState("");

  async function logout() {
    const resRaw = await fetch("/user/logout");
    if (!resRaw.ok) {
      const res = await resRaw.text();
      alert(res);
    }
    document.cookie = "_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location = "/auth/login";
  }

  useEffect(() => {
    if (props.user) {
      setAvatar(`../images/avatar_thumbnail/${props.user.avatar}.png`);
    }
  }, [props.user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3">
      <div className="container-fluid d-flex">
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
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
          <div className="nav-link" style={{ color: "rgba(255,255,255,1)" }}>
            Welcome, Visitor
          </div>
        ) : (
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarScroll"
          >
            <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item dropdown d-flex">
                <div
                  className="nav-link dropdown-toggle me-2"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Welcome, {props.user.username}
                </div>
                <div>
                  <img
                    src={avatar}
                    alt="avatar_thumbnail"
                    width="40"
                    height="40"
                  />
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
