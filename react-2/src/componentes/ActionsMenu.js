import React from "react";

function ActionsMenu() {
  return (
    <div className="actions-menu">
      <h1>Mascotas</h1>
      <div className="actions-menu-content">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Nueva
        </button>
        <div className="alert alert-danger alert-dismissible" role="alert">
          <strong>Oops!</strong> Algo hicimos mal, por favor vuelve a
          intentarlo!.
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActionsMenu;
