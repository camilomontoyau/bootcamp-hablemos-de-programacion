import React from "react";
import "./ModalHeader.css";

function ModalHeader({ cambiarModal = () => {} }) {
  return (
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalCenterTitle">
        Nueva Mascota
      </h5>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
        onClick={cambiarModal}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default ModalHeader;
