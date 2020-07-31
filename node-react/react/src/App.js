import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./componentes/Nav";

import "./App.css";
import Pagina from "./Pagina";

function App() {
  return (
    <div className="container">
      <Nav />
      <Switch>
        <Route
          exact
          path="/"
          component={(props) => (
            <Pagina {...props} titulo="Mascotas" entidad="mascotas" />
          )}
        />
        <Route
          path="/veterinarias"
          component={(props) => (
            <Pagina {...props} titulo="Veterinari@s" entidad="veterinarias" />
          )}
        />
        <Route
          path="/duenos"
          component={(props) => (
            <Pagina {...props} titulo="Dueñ@s" entidad="duenos" />
          )}
        />
        <Route
          path="/consultas"
          component={(props) => (
            <Pagina {...props} titulo="Consultas" entidad="consultas" />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
