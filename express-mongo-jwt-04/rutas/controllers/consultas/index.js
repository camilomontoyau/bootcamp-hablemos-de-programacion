const router = require("express").Router();
const createError = require("http-errors");
const Consulta = require("./schema");
const Usuario = require("../usuarios/schema");
const Mascota = require("../mascotas/schema");

const {
  listar,
  obtenerUno,
  actualizar,
  eliminar,
  middlewareEstaAutorizado,
  filtrarEntidades,
} = require("../genericos");
const {manejadorDeErrores} = require('../../../util');

router.get(
  "/",
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador", "dueno"],
  }),
  async (req, res, next) => {
    try {
      const { user } = req;
      let mascotasDueno = null;
      if (user.tipo === "dueno") {
        mascotasDueno = await Mascota.find({ dueno: user._id }).select("_id");
      }
      mascotasDueno = mascotasDueno.map((ele) => ele._id);

      const populate = [
        "mascota",
        { path: "veterinaria", select: "nombre apellido documento tipo email" },
      ];
      const filtro = filtrarEntidades(Consulta, req.query);
      if  (Array.isArray(mascotasDueno) && mascotasDueno.length > 0) {
        filtro.mascota = { $in: mascotasDueno };
      }
      let promesaLista = Consulta.find(filtro);
      if (Array.isArray(populate) && populate.length > 0) {
        for (const entidadAnidada of populate) {
          promesaLista = promesaLista.populate(entidadAnidada);
        }
      }
      const resultados = await promesaLista;
      return res.status(200).json(resultados);
    } catch (error) {
      manejadorDeErrores({error, next});
    }
  }
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
