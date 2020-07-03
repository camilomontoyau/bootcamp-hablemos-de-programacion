import React from "react";
import BotonAccion from "../BotonAccion";
import "./Fila.css";

function Fila({
  index,
  entidad,
  editarEntidad = () => {},
  eliminarEntidad = () => {},
}) {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{entidad.tipo}</td>
      <td>{entidad.nombre}</td>
      <td>{entidad.dueno}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Basic example">
          <BotonAccion tipo="editar" onClick={editarEntidad} index={index} />
          <BotonAccion
            tipo="eliminar"
            onClick={(e) => eliminarEntidad(e, index)}
          />
        </div>
      </td>
    </tr>
  );
}

export default Fila;
