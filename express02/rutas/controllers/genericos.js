const { listar, obtenerUno } = require("../../data-handler");

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

module.exports = {
  listar: listarEntidades,
  obtenerUno: obtenerUnaEntidad,
};
