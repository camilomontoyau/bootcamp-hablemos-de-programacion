import React, { useState } from "react";
import Encabezado from "./Encabezado";
import Fila from "./Fila";
import "./Tabla.css";

function Tabla() {
  const [mascotas] = useState([
    {
      tipo: "Gato",
      nombre: "manchas",
      dueno: "Esteban",
    },
    {
      tipo: "Perro",
      nombre: "manchas",
      dueno: "Jhon",
    },
  ]);
  const columnas = mascotas.length > 0 ? Object.keys(mascotas[0]) : [];
  return (
    <table className="table table-stripped table-hover">
      <Encabezado columnas={columnas} />
      <tbody id="lista-mascotas">
        {mascotas.map((mascota, index) => (
          <Fila key={`fila-${index}`} index={index} mascota={mascota} />
        ))}
      </tbody>
    </table>
  );
}

export default Tabla;
