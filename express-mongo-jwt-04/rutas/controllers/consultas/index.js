const router = require("express").Router();
const createError = require("http-errors");
const Consulta = require("./schema");
const Usuario = require("../usuarios/schema");
const Mascota = require("../mascotas/schema");

const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
  middlewareEstaAutorizado,
} = require("../genericos");

const listarHandler = listar({
  Modelo: Consulta,
  populate: [
    "mascota",
    { path: "veterinaria", select: "nombre apellido documento tipo email" },
  ],
});
router.get(
  "/",
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador"],
  }),
  listarHandler
);

const obtenerUnoHandler = obtenerUno({ Modelo: Consulta });
router.get(
  "/:_id",
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador"],
  }),
  obtenerUnoHandler
);


router.post(
  "/",
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador"],
  }),
  async (req, res, next) => {
    if (!req.body || !Object.keys(req.body).length) {
      const err = new createError[400]("Falta el body");
      return next(err);
    }
    const { mascota = null, veterinaria = null } = req.body;
    const { user } = req;
    const existeVeterinaria = await Usuario.exists({
      _id: user._id,
      tipo: "veterinaria",
    });
    const existeMascota = await Mascota.exists({ _id: mascota });
    if (existeVeterinaria && existeMascota) {
      const { _id, veterinaria, ...restoDatosEntidad } = req.body;
      restoDatosEntidad.veterinaria = user._id;
      const consulta = new Consulta(restoDatosEntidad);
      await consulta.save();
      return res.status(200).json(consulta);
    }
    if (!existeVeterinaria) {
      const err = new createError[400](
        `Veterinari@ con _id ${veterinaria} no existe!`
      );
      return next(err);
    }
    if (!existeMascota) {
      const err = new createError[400](
        `Mascota con _id ${mascota} no existe!`
      );
      return next(err);
    }
  }
);

const editarHandler = actualizar({ Modelo: Consulta });
router.put(
  "/:_id",
  middlewareEstaAutorizado({
    tiposUsuario: [],
  }),
  editarHandler
);

const eliminarHandler = eliminar({ Modelo: Consulta });
router.delete(
  "/:_id",
  middlewareEstaAutorizado({
    tiposUsuario: [],
  }),
  eliminarHandler
);

module.exports = router;
