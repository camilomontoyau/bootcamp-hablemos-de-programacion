import React from "react";

function ModalHeader() {
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
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default ModalHeader;
