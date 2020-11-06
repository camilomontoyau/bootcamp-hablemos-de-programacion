const router = require("express").Router();
const { eliminar } = require("../../../data-handler");

const { listar, obtenerUno, crear, actualizar } = require("../genericos");

const entidad = "mascotas";

const listarHandler = listar(entidad);
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno(entidad);
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear(entidad);
router.post("/", crearHandler);

const editarHandler = actualizar(entidad);
router.put("/:_id", editarHandler);

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
