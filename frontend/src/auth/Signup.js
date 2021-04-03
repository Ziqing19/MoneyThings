import React, { useState } from "react";
import InputBox from "../common/InputBox.js";
import { Link } from "react-router-dom";
import "./Auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [toggle_visibility, setToggleVisibility] = useState("password");

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handlePasswordConfirm(evt) {
    setPasswordConfirm(evt.target.value);
    if (evt.target.value !== password) {
      evt.target.classList.add("is-invalid");
    } else {
      evt.target.classList.remove("is-invalid");
    }
  }

  function handleToggleVisibility() {
    setToggleVisibility(toggle_visibility === "password" ? "text" : "password");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    // setEmail("");
    // setPassword("");
    // setPasswordConfirm("");
    fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((resRaw) => {
        console.log(resRaw);
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            alert(res);
          });
        } else {
          alert("Sign up succeed");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1 className="text-center mb-4">Sign Up</h1>
      <InputBox
        label="Email"
        value={email}
        type="email"
        onChange={handleEmail}
        feedback="Please provide a valid email address"
        required={true}
      />
      <InputBox
        label="Password"
        value={password}
        type={toggle_visibility}
        onChange={handlePassword}
        feedback="Please provide a valid password"
        required={true}
      />
      <InputBox
        label="Confirm Password"
        value={password_confirm}
        onChange={handlePasswordConfirm}
        type={toggle_visibility}
        feedback="Password and confirm password does not match"
        required={true}
      />
      <div className="mb-3 form-check">
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            onClick={handleToggleVisibility}
          />
          Show Password
        </label>
      </div>
      <button className="mb-3 btn btn-primary text-center">Submit</button>
      <div className="mb-2 d-flex justify-content-end">
        <Link className="text-end d-block" to="/auth/login">
          Log in
        </Link>
      </div>
    </form>
  );
}
