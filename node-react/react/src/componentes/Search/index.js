import React from "react";
import "./Search.css";

function Search({
  manejarSearchInput = () => {},
  buscar = () => {},
  entidad = null,
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
          <select name="mascota">
            <option value={undefined}>Mascota ...</option>
          </select>
          <select name="veterinaria">
            <option value={undefined}>Veterinaria ...</option>
          </select>
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
