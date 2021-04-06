const router = require("express").Router();
const createError = require("http-errors");
const Consulta = require("./schema");
const Usuario = require("../usuarios/schema");
const Mascota = require("../mascotas/schema");

const {
  obtenerUno,
  actualizar,
  eliminar,
  middlewareEstaAutorizado,
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
      let filtro = { ...req.query };
      if (user.tipo === "dueno") {
        filtro = {
          ...filtro,
          ["mascota.dueno._id"]: user._id,
        };
      }
      const resultados = await Consulta.find(filtro);
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
    tiposUsuario: ["veterinaria", "administrador", "dueno"],
  }),
  async (req, res, next) => {
    try {
      const { _id } = req.params;
      const { user } = req;
      let consulta = null;
      consulta = await Consulta.findById(_id);
      if  (consulta && user.tipo === "dueno") {
        const mascota = await Mascota.findOne({
          _id: consulta.mascota,
          dueno: user._id
        });
        if(!mascota) {
          const err = new createError[403]();
          return next(err);
        } 
      }
      if (consulta) {
        return res.status(200).json(consulta);
      }
      const err = new createError[404]();
      return next(err);
    } catch (error) {
      const err = new createError[500]();
      return next(err);
    }
  }
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
    const {
      mascota: mascotaId,
      veterinaria: _veterinariaBody,
      ...restoDatosEntidad
    } = req.body;
    const { user } = req;
    const veterinaria = await Usuario.findOne({
      _id: user._id,
      tipo: "veterinaria",
    }).select("-password");
    const mascota = await Mascota.findById(mascotaId);
    if (veterinaria && veterinaria._id && mascota && mascota._id) {
      restoDatosEntidad.veterinaria = veterinaria;
      restoDatosEntidad.mascota = mascota;
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

router.post(
  "/:_id/notas",
  middlewareEstaAutorizado({
    tiposUsuario: ["veterinaria", "administrador"],
  }),
  async (req, res, next) => {
    if (!req.body || !req.body.mensaje) {
      const err = new createError[400]("Falta el body o el mensaje");
      return next(err);
    }
    const { mensaje = null } = req.body;
    const { _id } = req.params;
    const { user } = req;
    const existeVeterinaria = await Usuario.exists({
      _id: user._id,
      tipo: "veterinaria",
    });
    const consulta = await Consulta.findById(_id);
    if (existeVeterinaria && consulta && consulta._id) {
      const nota = { veterinaria: user._id, mensaje };
      consulta.notas.push(nota);
      await consulta.save();
      return res.status(200).json(consulta.notas);
    }
    if (!existeVeterinaria) {
      const err = new createError[400](
        `Veterinari@ con _id ${veterinaria} no existe!`
      );
      return next(err);
    }
  }
);

module.exports = router;
