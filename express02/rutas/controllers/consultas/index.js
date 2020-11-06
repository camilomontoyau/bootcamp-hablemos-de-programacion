const router = require("express").Router();

const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
} = require("../genericos");

const entidad = "consultas";

const listarHandler = listar(entidad);
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno(entidad);
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear(entidad);
router.post("/", crearHandler);

const editarHandler = actualizar(entidad);
router.put("/:_id", editarHandler);

const eliminarHandler = eliminar(entidad);
router.delete("/:_id", eliminarHandler);

module.exports = router;
