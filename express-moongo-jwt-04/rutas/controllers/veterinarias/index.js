const router = require("express").Router();
const Veterinaria = require("./schema");


const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
  existeDocumento,
} = require("../genericos");

const listarHandler = listar({ Modelo: Veterinaria });
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Veterinaria });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Veterinaria });
const middlewareExisteDocumento = existeDocumento({
  Modelo: Veterinaria,
  campos: ["documento"],
});
router.post("/", middlewareExisteDocumento, crearHandler);

const editarHandler = actualizar({ Modelo: Veterinaria });
const middlewareExisteEntidadConMismoDocumentoyDiferenteId = existeDocumento({
  Modelo: Veterinaria,
  campos: ["documento", { operador: "$ne", nombre: "_id" }],
});
router.put(
  "/:_id",
  middlewareExisteEntidadConMismoDocumentoyDiferenteId,
  editarHandler
);

const eliminarHandler = eliminar({ Modelo: Veterinaria });
router.delete("/:_id", eliminarHandler);

module.exports = router;
