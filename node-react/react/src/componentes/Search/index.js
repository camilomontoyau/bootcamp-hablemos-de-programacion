import React from "react";
import "./Search.css";

function Search(props) {
  return (
    <form className="form-inline">
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-primary" type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;
