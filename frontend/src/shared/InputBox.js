import React, { useState } from "react";
import PropTypes from "prop-types";
import _uniqueId from "lodash/uniqueId";

export default function InputBox(props) {
  const [id] = useState(_uniqueId("input-"));

  return (
    <div className="form-floating my-3">
      <input
        type={props.type === undefined ? "text" : props.type}
        className="form-control"
        id={id}
        value={props.value}
        onChange={props.onChange}
        placeholder="placeholder"
        required={props.required || false}
      />
      <label htmlFor="input">{props.label}</label>
      <div
        className={
          "invalid-feedback" + (props.feedback === undefined ? " d-none" : "")
        }
      >
        {props.feedback}
      </div>
    </div>
  );
}

InputBox.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  feedback: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
