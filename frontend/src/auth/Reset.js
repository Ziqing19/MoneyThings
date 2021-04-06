import React, { useState } from "react";
import InputBox from "../shared/InputBox.js";
import { Link } from "react-router-dom";
import "./Auth.css";

export default function Reset() {
  const [email, setEmail] = useState("");

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    setEmail("");
    fetch("/authentication/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((resRaw) => {
        console.log(resRaw);
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            alert(res);
          });
        } else {
          alert("Reset password succeed");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1 className="text-center mb-4">Reset Password</h1>
      <InputBox
        label="Email"
        value={email}
        type="email"
        onChange={handleEmail}
        feedback="Please provide a valid email address"
        required={true}
      />
      <div className="invalid-feedback">no!!!</div>
      <button className="mb-3 btn btn-primary text-center">Submit</button>
      <div className="mb-2 d-flex justify-content-end">
        <Link className="text-end d-block" to="/auth/login">
          Log in
        </Link>
      </div>
    </form>
  );
}
