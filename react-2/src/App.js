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
          component={() => <Pagina titulo="Mascotas" entidad="mascotas" />}
        />
        <Route
          path="/veterinarias"
          component={() => (
            <Pagina titulo="Veterinari@s" entidad="veterinarias" />
          )}
        />
        <Route
          path="/duenos"
          component={() => <Pagina titulo="Dueñ@s" entidad="duenos" />}
        />
        <Route
          path="/consultas"
          component={() => <Pagina titulo="Consultas" entidad="consultas" />}
        />
      </Switch>
    </div>
  );
}

export default App;
