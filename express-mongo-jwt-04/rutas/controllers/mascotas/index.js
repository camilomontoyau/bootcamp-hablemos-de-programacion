const createError = require("http-errors");
const router = require("express").Router();
const Mascota = require("./schema");
const Usuario = require("../usuarios/schema");


const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
  filtrarEntidades,
  middlewareEstaAutorizado,
} = require("../genericos");

router.get(
  "/", 
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador", "dueno"],
  }),
  async (req, res, next) => {
  try {
    const { user } = req;
    const filtro = filtrarEntidades(Mascota, req.query);
    if(user.tipo === "dueno") {
      filtro.dueno = user._id;
    }
    let promesaLista = Mascota.find(filtro);
    const populate = [{ path: "dueno", select: "nombre apellido documento tipo email" }];
    if (Array.isArray(populate) && populate.length > 0) {
      for (const entidadAnidada of populate) {
        promesaLista = promesaLista.populate(entidadAnidada);
      }
    }
    const resultados = await promesaLista;
    return res.status(200).json(resultados);
  } catch (error) {
    const err = new createError[500]();
    return next(err);
  }
});

const obtenerUnoHandler = obtenerUno({ Modelo: Mascota });
router.get(
  "/:_id",
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador", "dueno"],
  }),
  obtenerUnoHandler
);

const crearHandler = crear({ Modelo: Mascota });
router.post(
  "/",
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador"],
  }),
  async (req, res, next) => {
  const { dueno = null } = req.body;
  const existeDueno = await Usuario.exists({ _id: dueno, tipo: "dueno" });
  if (existeDueno) {
    return crearHandler(req, res);
  }
  const err = new createError[404]();
  next(err);
});

const editarHandler = actualizar({ Modelo: Mascota });
router.put(
  "/:_id", 
  middlewareEstaAutorizado({
  tiposUsuario: ["veterinaria", "administrador", "dueno"],
  }),
editarHandler);

const eliminarHandler = eliminar({ Modelo: Mascota });
router.delete(
  "/:_id", 
  middlewareEstaAutorizado({
    tiposUsuario: [],
  }), 
  eliminarHandler
);

module.exports = router;
