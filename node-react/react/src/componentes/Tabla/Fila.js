import React from "react";
import BotonAccion from "../BotonAccion";
import "./Fila.css";

const evaluarCampo = ({ entidad, columna }) => {
  if (columna === "veterinaria") {
    return `${entidad[columna].nombre} ${entidad[columna].apellido}`;
  }
  if (columna === "mascota") {
    return `${entidad[columna].nombre} (${entidad[columna].tipo})`;
  }
  return entidad[columna];
};

function Fila({
  index,
  entidad,
  editarEntidad = () => {},
  eliminarEntidad = () => {},
  columnas = [],
}) {
  return (
    <tr>
      <th scope="row">{index}</th>
      {columnas.map((columna, _index) => (
        <td key={`col-${columna}-${_index}`}>
          {evaluarCampo({ entidad, columna })}
        </td>
      ))}
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
