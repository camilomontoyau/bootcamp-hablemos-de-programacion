import React, { Component } from "react";
import ActionsMenu from "./componentes/ActionsMenu";
import Tabla from "./componentes/Tabla";
import Modal from "./componentes/Modal";
import {
  listarEntidad,
  crearEditarEntidad,
  eliminarEntidad,
  obtenerUno,
} from "./servicio";
import ComponenteCampo from "./componentes/ComponenteCampo";

const opcionesIniciales = {
  tipo: [
    { valor: "Perro", etiqueta: "Perro" },
    { valor: "Gato", etiqueta: "Gato" },
    { valor: "Pájaro", etiqueta: "Pájaro" },
    { valor: "Otro", etiqueta: "Otro" },
  ],
  diagnostico: [
    { valor: "Prurito de piel (sarna)", etiqueta: "Prurito de piel (sarna)" },
    { valor: "Moquillo", etiqueta: "Moquillo" },
    { valor: "Trauma cefálico", etiqueta: "Trauma cefálico" },
    { valor: "Parvovirosis", etiqueta: "Parvovirosis" },
  ],
  mascota: [],
  veterinaria: [],
  dueno: [],
};

class Pagina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostraModal: false,
      entidades: [],
      objeto: {},
      idObjeto: null,
      method: "POST",
      columnas: [],
      options: opcionesIniciales,
      search: "",
      veterinaria: "",
      mascota: "",
    };
  }

  cambiarModal = (_evento, method = "POST", newState = {}) => {
    let _newState = {
      ...newState,
      mostraModal: !this.state.mostraModal,
      method,
    };
    if (method === "POST") {
      _newState = { ..._newState, idObjeto: null, objeto: {} };
    }
    this.obtenerOpcionesBackend(_newState);
  };

  listar = async (_evento = null) => {
    if (_evento) {
      _evento.preventDefault();
    }
    const { entidad } = this.props;
    const { search, columnas, veterinaria, mascota } = this.state;
    const entidades = await listarEntidad({
      entidad,
      search,
      columnas,
      veterinaria,
      mascota,
    });
    let _columnas = [];
    if (Array.isArray(entidades) && entidades.length > 0) {
      _columnas = Object.keys(entidades[0]).filter((col) => col !== "id") || [];
    }
    this.setState({ entidades, columnas: _columnas });
  };

  manejarInput = (evento) => {
    const {
      target: { value, name },
    } = evento;
    let { objeto } = this.state;
    objeto = { ...objeto, [name]: value };
    this.setState({ objeto });
  };

  crearEntidad = async (_evento = null) => {
    const { entidad } = this.props;
    let { objeto, method, idObjeto } = this.state;
    await crearEditarEntidad({ entidad, objeto, method, idObjeto });
    this.cambiarModal();
  };

  obtenerOpcionesBackend = async (newState) => {
    const { options } = this.state;
    const mascotasPromise = listarEntidad({ entidad: "mascotas" });
    const veterinariasPromise = listarEntidad({ entidad: "veterinarias" });
    const duenosPromise = listarEntidad({ entidad: "duenos" });
    let [mascota = [], veterinaria = [], dueno = []] = await Promise.all([
      mascotasPromise,
      veterinariasPromise,
      duenosPromise,
    ]);
    mascota = mascota.map((_mascota, index) => ({
      valor: _mascota.id,
      etiqueta: `${_mascota.nombre} (${_mascota.tipo})`,
    }));
    veterinaria = veterinaria.map((_veterinaria, index) => ({
      valor: _veterinaria.id,
      etiqueta: `${_veterinaria.nombre} ${_veterinaria.apellido}`,
    }));
    dueno = dueno.map((_dueno, index) => ({
      valor: _dueno.id,
      etiqueta: `${_dueno.nombre} ${_dueno.apellido}`,
    }));
    const nuevasOpciones = { ...options, mascota, veterinaria, dueno };
    this.setState({ ...newState, options: nuevasOpciones }, () => {
      this.listar();
    });
  };

  editarEntidad = async (_evento, index) => {
    const { entidad } = this.props;
    const objeto = await obtenerUno({ entidad, idObjeto: index });
    const newState = { objeto, idObjeto: index };
    this.cambiarModal(null, "PUT", newState);
  };

  eliminarEntidad = async (_evento, index) => {
    const { entidad } = this.props;
    const respuesta = await eliminarEntidad({ entidad, idObjeto: index });
    this.listar();
  };

  manejarSearchInput = (evento) => {
    const {
      target: { value, name },
    } = evento;
    console.log({ value, name });
    this.setState({ [name]: value });
  };

  componentDidMount() {
    const { entidad } = this.props;
    if (entidad === "consultas") {
      this.obtenerOpcionesBackend({});
      return;
    }
    this.listar();
  }

  // codigo del componente

  // el método render siempre debe ir de último
  render() {
    const { titulo = "Página sin título", entidad } = this.props;
    const { columnas, idObjeto, entidades, objeto, options } = this.state;
    return (
      <>
        <ActionsMenu
          cambiarModal={this.cambiarModal}
          titulo={titulo}
          manejarSearchInput={this.manejarSearchInput}
          buscar={this.listar}
          entidad={entidad}
          options={options}
        />
        <Tabla
          entidades={entidades}
          editarEntidad={this.editarEntidad}
          eliminarEntidad={this.eliminarEntidad}
          columnas={columnas}
        />
        {this.state.mostraModal && (
          <Modal
            cambiarModal={this.cambiarModal}
            manejarInput={this.manejarInput}
            crearEntidad={this.crearEntidad}
            entidad={entidad}
            idObjeto={idObjeto}
          >
            {columnas.map((columna, index) => (
              <ComponenteCampo
                key={index}
                manejarInput={this.manejarInput}
                objeto={objeto}
                nombreCampo={columna}
                options={options}
              />
            ))}
          </Modal>
        )}
      </>
    );
  }
}

export default Pagina;
