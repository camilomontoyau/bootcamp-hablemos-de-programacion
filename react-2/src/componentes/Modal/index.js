import React from "react";
import ModalHeader from "./ModalHeader";
import Select from "../Select";
import "./Modal.css";

function Modal() {
  return (
    <>
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="">
            <ModalHeader />
            <div className="modal-body">
              <form id="form">
                <Select />
                <div className="form-row">
                  <div className="col">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-control"
                      placeholder="Nombre"
                    />
                  </div>
                  <div className="col">
                    <select className="form-control" id="dueno">
                      <option>Dueño</option>
                      <option>Esteban</option>
                      <option>Julián</option>
                      <option>Jhon</option>
                      <option>Felix</option>
                      <option>Camilo</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
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
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    </>
  );
}

export default Modal;
