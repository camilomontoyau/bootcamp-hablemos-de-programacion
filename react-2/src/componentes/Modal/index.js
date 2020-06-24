import React from "react";
import ModalHeader from "./ModalHeader";
import Select from "../Select";
import Input from "../Input";
import "./Modal.css";

const tiposMascota = [
  { valor: "Perro", etiqueta: "Perro" },
  { valor: "Gato", etiqueta: "Gato" },
  { valor: "Pájaro", etiqueta: "Pájaro" },
  { valor: "Otro", etiqueta: "Otro" },
];

const duenos = [
  { valor: "Esteban", etiqueta: "Esteban" },
  { valor: "Julián", etiqueta: "Julián" },
  { valor: "Jhon", etiqueta: "Jhon" },
  { valor: "Felix", etiqueta: "Felix" },
  { valor: "Camilo", etiqueta: "Camilo" },
];

function Modal() {
  return (
    <>
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <ModalHeader />
            <div className="modal-body">
              <form id="form">
                <div className="form-row">
                  <div className="col">
                    <Select options={tiposMascota} nombreCampo="Tipo animal" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <Input tipo="text" nombreCampo="nombre" />
                  </div>
                  <div className="col">
                    <Select options={duenos} nombreCampo="dueño" />
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
