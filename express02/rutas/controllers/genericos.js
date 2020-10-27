const { listar } = require("../../data-handler");

const listarEntidades = async (entidad, req, res) => {
  if (!entidad) {
    res.status(404).status({ mensaje: "no encontrado" });
  }
  const mascotas = await listar({ directorioEntidad: entidad });
  res.status(200).json(mascotas);
};

module.exports = {
  listar: listarEntidades,
};
