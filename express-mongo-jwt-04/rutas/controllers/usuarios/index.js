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
    usuario = usuario.toJSON();
    const { password, ...restoUsuario } = usuario;
    console.log({ restoUsuario });
    return res.status(200).json(restoUsuario);
  } catch (error) {
    return manejadorDeErrores({ error, next });
  }
});

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
