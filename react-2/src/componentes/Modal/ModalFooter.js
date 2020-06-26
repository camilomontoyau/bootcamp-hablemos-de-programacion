import React from "react";
import "./ModalFooter.css";

function ModalFooter() {
  return (
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        Cerrar
      </button>
      <button
        type="button"
        className="btn btn-primary"
        data-dismiss="modal"
        id="btn-guardar"
      >
        Crear
      </button>
    </div>
  );
}

export default ModalFooter;
