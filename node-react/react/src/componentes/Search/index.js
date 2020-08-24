import React from "react";
import Select from "../Select";
import "./Search.css";

function Search({
  manejarSearchInput = () => {},
  buscar = () => {},
  entidad = null,
  options = {},
}) {
  return (
    <form className="form-inline">
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        name="search"
        onInput={manejarSearchInput}
      />
      {entidad === "consultas" && (
        <>
          <Select
            options={options.mascota ? options.mascota : []}
            nombreCampo="mascota"
            placeholder="mascota"
            onChange={manejarSearchInput}
          />
          <Select
            options={options.veterinaria ? options.veterinaria : []}
            nombreCampo="veterinaria"
            placeholder="veterinaria"
            onChange={manejarSearchInput}
          />
        </>
      )}
      <button
        className="btn btn-outline-primary"
        type="submit"
        onClick={buscar}
      >
        Search
      </button>
    </form>
  );
}

export default Search;
