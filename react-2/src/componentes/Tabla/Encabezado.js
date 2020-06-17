import React from "react";
import "./Encabezado.css";

function Encabezado(props) {
  if (props.columnas.length === 0) return false;
  return (
    <thead className="thead-dark">
      <tr>
        <th scope="col">#</th>
        {props.columnas.map((columna) => (
          <th scope="col">{columna}</th>
        ))}
        <th scope="col"></th>
      </tr>
    </thead>
  );
}

export default Encabezado;
