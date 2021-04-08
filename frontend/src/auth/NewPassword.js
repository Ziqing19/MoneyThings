import React, { useState } from "react";
import InputBox from "../shared/InputBox.js";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [toggle_visibility, setToggleVisibility] = useState("password");

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
    // setPassword("");
    // setPasswordConfirm("");
    fetch("/user/new-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
          alert("Update password succeed");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1 className="text-center mb-4">Update Password</h1>
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
    </form>
  );
}
