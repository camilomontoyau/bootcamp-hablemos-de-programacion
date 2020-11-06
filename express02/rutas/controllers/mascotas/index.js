const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { actualizar, eliminar } = require("../../../data-handler");

const { listar, obtenerUno, crear } = require("../genericos");

const entidad = "mascotas";

const listarHandler = listar(entidad);
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno(entidad);
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear(entidad);
router.post("/", crearHandler);

router.put("/:_id", async (req, res) => {
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
});

router.delete("/:_id", async (req, res) => {
  const { _id = null } = req.params;
  if (!_id) {
    return res.status(400).json({ mensaje: "Falta el id" });
  }
  if (!entidad) {
    res.status(404).status({ mensaje: "no encontrado" });
  }
  await eliminar({ directorioEntidad: entidad, nombreArchivo: _id });
  return res.status(204).send();
});

module.exports = router;
