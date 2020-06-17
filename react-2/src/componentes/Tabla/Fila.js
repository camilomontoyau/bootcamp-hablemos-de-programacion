import React from "react";
import BotonAccion from "../BotonAccion";
import "./Fila.css";

function Fila({ index, mascota }) {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{mascota.tipo}</td>
      <td>{mascota.nombre}</td>
      <td>{mascota.dueno}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Basic example">
          <BotonAccion tipo="editar" />
          <BotonAccion tipo="eliminar" />
          <button type="button" className="btn btn-info editar">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" className="btn btn-danger eliminar">
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Fila;
