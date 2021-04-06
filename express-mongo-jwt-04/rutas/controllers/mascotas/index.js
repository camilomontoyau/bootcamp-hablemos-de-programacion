const createError = require("http-errors");
const router = require("express").Router();
const Mascota = require("./schema");
const Usuario = require("../usuarios/schema");
const { manejadorDeErrores } = require("../../../util");


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
    let filtro = { ...req.query };
    if (user.tipo === "dueno") {
      filtro = { ...filtro, ["dueno._id"]: user._id };
    }
    const resultados = await Mascota.find(filtro);
    return res.status(200).json(resultados);
  } catch (error) {
    manejadorDeErrores({ error, next });
  }
});

router.get(
  "/:_id",
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador", "dueno"],
  }),
  async (req, res, next) => {
    try {
      const { _id } = req.params;
      const { user } = req;
      let mascota = null;
      if (user.tipo === "dueno") {
        mascota = await Mascota.findOne({ _id, dueno: user._id });
        if (!mascota) {
          const err = new createError[403]();
          return next(err);
        }
      } else {
        mascota = await Mascota.findById(_id);
      }
      if (!mascota) {
        const err = new createError[404]();
        return next(err);
      }
      return res.status(200).json(mascota);
    } catch (error) {
      manejadorDeErrores({ error, next });
    }
  }
);

router.post(
  "/",
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador"],
  }),
  async (req, res, next) => {
    try {
      if (!req.body || !Object.keys(req.body).length) {
        const err = new createError[400]("Falta el body");
        return next(err);
      }
      const { dueno: duenoId, _id, ...restoDatosEntidad } = req.body;
      const dueno = await Usuario.findById(duenoId).select("-password");
      if (dueno && dueno._id) {
        restoDatosEntidad.dueno = dueno;
        const mascota = new Mascota(restoDatosEntidad);
        await mascota.save();
        return res.status(200).json(mascota);
      }
      const err = new createError[404]("Dueno no encontrado");
      return next(err);      
    } catch (error) {
      manejadorDeErrores({next, error});
    }
});

router.put(
  "/:_id",
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador", "dueno"],
  }),
  async (req, res, next) => {
    try {
      const { _id = null } = req.params;
      const { _id: id, ...datosNuevos } = req.body;
      const { user } = req;
      if (!_id) {
        const err = new createError[400]("Falta el _id");
        return next(err);
      }
      let mascota = null;
      if (user.tipo === "dueno") {
        mascota = await Mascota.findOne({ _id, dueno: user._id });
        if (!mascota) {
          const err = new createError[403]();
          return next(err);
        }
        datosNuevos.dueno = user._id;
      } else {
        mascota = await Mascota.findById(_id);
      }
      if (!mascota) {
        const err = new createError[404]();
        return next(err);
      }
      mascota.set(datosNuevos);
      await mascota.save();
      return res.status(200).json(mascota);
    } catch (error) {
      if (error.code === 11000) {
        const err = new createError[409](
          `entidad ${JSON.stringify(
            req.body
          )} tiene campos que no permiten duplicación!`
        );
        return next(err);
      }
      manejadorDeErrores({ error, next });
    }
  }
);

const eliminarHandler = eliminar({ Modelo: Mascota });
router.delete(
  "/:_id", 
  middlewareEstaAutorizado({
    tiposUsuario: [],
  }), 
  eliminarHandler
);

module.exports = router;
