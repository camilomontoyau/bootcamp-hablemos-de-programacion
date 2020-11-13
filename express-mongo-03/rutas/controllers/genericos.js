const { v4: uuidv4 } = require("uuid");
const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
} = require("../../data-handler");

const listarEntidades = function closureListar(entidad) {
  return async function closureHandlerListar(req, res) {
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    const mascotas = await listar({ directorioEntidad: entidad });
    res.status(200).json(mascotas);
  };
};

const obtenerUnaEntidad = function closureObtenerUno(entidad) {
  return async function closureHandlerObtenerUno(req, res) {
    const { _id = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    const _entidad = await obtenerUno({
      directorioEntidad: entidad,
      nombreArchivo: _id,
    });
    if (_entidad) {
      return res.status(200).json(_entidad);
    }
    res.status(404).json({ mensaje: "no encontrado" });
  };
};

const crearEntidad = function closureCrearEntidad(entidad) {
  return async function closureHandlerCrearEntidad(req, res) {
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    if (req.body && Object.keys(req.body).length > 0) {
      const _id = uuidv4();
      const datosMascotaNueva = { ...req.body, _id };
      const nuevaMascota = await crear({
        directorioEntidad: entidad,
        nombreArchivo: _id,
        datosGuardar: datosMascotaNueva,
      });
      return res.status(200).json(nuevaMascota);
    }
    return res.status(400).json({ mensaje: "Falta el body" });
  };
};

const editarEntidad = function closureEditarEntidad(entidad) {
  return async function closureHandlerEditarEntidad(req, res) {
    const { _id = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    if (req.body && Object.keys(req.body).length > 0) {
      const datosActuales = { ...req.body, _id };
      const mascotaActualizada = await actualizar({
        directorioEntidad: entidad,
        nombreArchivo: _id,
        datosActuales,
      });
      return res.status(200).json(mascotaActualizada);
    }
    return res.status(400).json({ mensaje: "Falta el body" });
  };
};

const eliminarEntidad = function closureEliminarEntidad(entidad) {
  return async function closureHandlerEliminarEntidad(req, res) {
    const { _id = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    await eliminar({ directorioEntidad: entidad, nombreArchivo: _id });
    return res.status(204).send();
  };
};

module.exports = {
  listar: listarEntidades,
  obtenerUno: obtenerUnaEntidad,
  crear: crearEntidad,
  actualizar: editarEntidad,
  eliminar: eliminarEntidad,
};
