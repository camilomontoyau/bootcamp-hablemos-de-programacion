import React, { Component } from "react";
import Nav from "./componentes/Nav";
import ActionsMenu from "./componentes/ActionsMenu";
import Tabla from "./componentes/Tabla";
import Modal from "./componentes/Modal";
import { listarEntidad } from "./servicio";

class Pagina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostraModal: false,
      entidades: [],
    };
  }

  cambiarModal = () => {
    this.setState({ mostraModal: !this.state.mostraModal });
  };

  listar = async () => {
    const { entidad } = this.props;
    const entidades = await listarEntidad({ entidad });
    this.setState({ entidades });
  };

  componentDidMount() {
    this.listar();
  }

  // codigo del componente

  // el método render siempre debe ir de último
  render() {
    const { titulo = "Página sin título" } = this.props;
    return (
      <>
        <div className="container">
          <Nav />
          <ActionsMenu cambiarModal={this.cambiarModal} titulo={titulo} />
          <Tabla entidades={this.state.entidades} />
          {this.state.mostraModal && <Modal cambiarModal={this.cambiarModal} />}
        </div>
      </>
    );
  }
}

export default Pagina;
