import React from "react";
import Search from "../Search";
import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <a className="navbar-brand" href="#">
        Veterinaria
      </a>
      <div className="navbar-right" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/index.html">
              Mascotas<span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/veterinarias.html">
              Veterinari@s
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/consultas.html">
              Consultas
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/duenos.html">
              Dueños
            </a>
          </li>
        </ul>
        <Search />
      </div>
    </nav>
  );
}

export default Nav;
