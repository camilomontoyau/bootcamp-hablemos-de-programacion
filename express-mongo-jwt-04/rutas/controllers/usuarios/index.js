const router = require("express").Router();
const Usuario = require("./schema");
const { manejadorDeErrores } = require("../../../util");


const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
  existeDocumento,
} = require("../genericos");

const listarHandler = listar({ Modelo: Usuario });
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Usuario });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Usuario });
const middlewareExisteDocumento = existeDocumento({
  Modelo: Usuario,
  campos: ["documento"],
});
router.post("/", middlewareExisteDocumento, async (req, res, next) => {
  try {
    if (!req.body || !Object.keys(req.body).length) {
      const err = new createError[400]("Falta el body");
      return next(err);
    }
    const { _id, ...restoDatosEntidad } = req.body;
    let usuario = new Usuario(restoDatosEntidad);
    await usuario.save();
    usuario = removerPaswordDeRespuestas(usuario);
    return res.status(200).json(usuario);
  } catch (error) {
    return manejadorDeErrores({ error, next });
  }
});

const removerPaswordDeRespuestas = (objeto) => {
  if (!(typeof objeto.toJSON === "function"))
    throw new Error("no es instancia de mongoose");
  objeto = objeto.toJSON();
  const { password, ...resto } = objeto;
  return resto;
};

const editarHandler = actualizar({ Modelo: Usuario });
const middlewareExisteEntidadConMismoDocumentoyDiferenteId = existeDocumento({
  Modelo: Usuario,
  campos: ["documento", { operador: "$ne", nombre: "_id" }],
});
router.put(
  "/:_id",
  middlewareExisteEntidadConMismoDocumentoyDiferenteId,
  editarHandler
);

const eliminarHandler = eliminar({ Modelo: Usuario });
router.delete("/:_id", eliminarHandler);

module.exports = router;
