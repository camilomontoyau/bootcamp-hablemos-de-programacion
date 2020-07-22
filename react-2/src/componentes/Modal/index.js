import React, { useState, useEffect } from "react"; // acá vamos
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import "./Modal.css";

function Modal({
  cambiarModal = () => {},
  crearEntidad = () => {},
  children = [],
  idObjeto = null,
  entidad = null,
}) {
  return (
    <>
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <ModalHeader cambiarModal={cambiarModal} />
            <div className="modal-body">
              <form id="form">
                <div className="form-row">{children}</div>
              </form>
            </div>
            <ModalFooter
              cambiarModal={cambiarModal}
              crearEntidad={crearEntidad}
            />
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default Modal;
