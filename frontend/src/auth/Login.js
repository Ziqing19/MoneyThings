import React, { useState } from "react";
import InputBox from "../shared/InputBox.js";
import { Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    // setUsername("");
    // setPassword("");
    const checked = document.querySelector(".form-check-input").checked;
    const data = {
      username: username,
      password: password,
      checked: checked,
    };
    console.log(data);
    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resRaw) => {
        console.log(resRaw);
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            alert(res);
          });
        } else {
          alert("Log in succeed");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1 className="text-center mb-4">Log In</h1>
      <InputBox
        label="Username"
        value={username}
        onChange={handleUsername}
        feedback="Please provide a valid username or email address"
        required={true}
      />
      <InputBox
        label="Password"
        value={password}
        onChange={handlePassword}
        type="password"
        feedback="Please provide a valid password"
        required={true}
      />
      <div className="mb-3 form-check">
        <label className="form-check-label">
          Keep Me Logged in
          <input type="checkbox" className="form-check-input" />
        </label>
      </div>
      <button className="mb-3 btn btn-primary text-center">Submit</button>
      <div className="mb-2 d-flex justify-content-end">
        <Link className="text-end d-block" to="/auth/reset">
          Forgot password?
        </Link>
      </div>
      <div className="mb-2 d-flex justify-content-end">
        <Link className="text-end d-block" to="/auth/signup">
          Sign up
        </Link>
      </div>
      <div className="mb-2 d-flex justify-content-end">
        <Link className="text-end d-block" to="/auth/new-password">
          New Password(temp)
        </Link>
      </div>
    </form>
  );
}
