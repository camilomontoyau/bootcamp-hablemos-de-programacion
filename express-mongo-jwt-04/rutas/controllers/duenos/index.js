const router = require("express").Router();
const Dueno = require("./schema");


const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
  existeDocumento,
} = require("../genericos");

const listarHandler = listar({ Modelo: Dueno });
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Dueno });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Dueno });
const middlewareExisteDocumento = existeDocumento({
  Modelo: Dueno,
  campos: ["documento"],
});
router.post("/", middlewareExisteDocumento, crearHandler);

const editarHandler = actualizar({ Modelo: Dueno });
const middlewareExisteEntidadConMismoDocumentoyDiferenteId = existeDocumento({
  Modelo: Dueno,
  campos: ["documento", { operador: "$ne", nombre: "_id" }],
});
router.put(
  "/:_id",
  middlewareExisteEntidadConMismoDocumentoyDiferenteId,
  editarHandler
);

const eliminarHandler = eliminar({ Modelo: Dueno });
router.delete("/:_id", eliminarHandler);

module.exports = router;
