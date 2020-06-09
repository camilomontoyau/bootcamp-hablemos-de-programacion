import React from "react";
import Nav from "./componentes/Nav";
import ActionsMenu from "./componentes/ActionsMenu";
import Tabla from "./componentes/Tabla";

function Mascotas() {
  return (
    <>
      <div className="container">
        <Nav />
        <ActionsMenu />
        <Tabla />
      </div>
    </>
  );
}

export default Mascotas;
