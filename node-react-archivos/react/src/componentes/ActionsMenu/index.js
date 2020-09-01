import React from "react";
import "./ActionsMenu.css";
import Search from "../Search";

function ActionsMenu({
  cambiarModal = () => {},
  titulo,
  manejarSearchInput = () => {},
  buscar = () => {},
  entidad = null,
  options = [],
}) {
  return (
    <div className="actions-menu">
      <h1>{titulo}</h1>
      <div className="actions-menu-content">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={cambiarModal}
        >
          Nueva
        </button>
        <Search
          manejarSearchInput={manejarSearchInput}
          buscar={buscar}
          entidad={entidad}
          options={options}
        />
      </div>
    </div>
  );
}

export default ActionsMenu;
