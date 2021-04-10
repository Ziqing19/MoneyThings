import React, { useState } from "react";
import propTypes from "prop-types";

export default function Modal(props) {
  const [data, dataHandler] = useState();

  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">{props.Content({ dataHandler })}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => {
                props.dataHandler(data);
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  id: propTypes.string.isRequired,
  Content: propTypes.elementType.isRequired,
  dataHandler: propTypes.func.isRequired,
};
