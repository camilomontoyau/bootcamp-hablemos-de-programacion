import React, { Component } from "react";
import Nav from "./componentes/Nav";
import ActionsMenu from "./componentes/ActionsMenu";
import Tabla from "./componentes/Tabla";
import Modal from "./componentes/Modal";

class Pagina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostraModal: false,
    };
  }

  cambiarModal = () => {
    this.setState({ mostraModal: !this.state.mostraModal });
  };

  // codigo del componente

  // el método render siempre debe ir de último
  render() {
    return (
      <>
        <div className="container">
          <Nav />
          <ActionsMenu cambiarModal={this.cambiarModal} />
          <Tabla />
          {this.state.mostraModal && <Modal cambiarModal={this.cambiarModal} />}
        </div>
      </>
    );
  }
}

export default Pagina;
