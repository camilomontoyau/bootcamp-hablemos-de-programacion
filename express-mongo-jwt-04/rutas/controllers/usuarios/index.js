const router = require("express").Router();
const bcrypt = require("bcrypt");
const Usuario = require("./schema");
const {
  manejadorDeErrores,
  removerPaswordDeRespuestas,
} = require("../../../util");


const { eliminar, existeDocumento, filtrarEntidades } = require("../genericos");

router.get("/", async (req, res, next) => {
  try {
    let filtro = filtrarEntidades(Usuario, req.query);
    const { user } = req;
    let queryAuxiliar = {};
    if (user.tipo === "veterinaria") {
      queryAuxiliar = {
        $and: [{ $or: [{ _id: user._id }, { tipo: "dueno" }] }],
      };
    }
    filtro = { ...filtro, ...queryAuxiliar };
    let resultados = await Usuario.find(filtro);
    resultados = resultados.map(removerPaswordDeRespuestas);
    return res.status(200).json(resultados);
  } catch (error) {
    const err = new createError[500]();
    return next(err);
  }
});

router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    let usuario = await Usuario.findById(_id);
    if (usuario) {
      usuario = removerPaswordDeRespuestas(usuario);
      return res.status(200).json(usuario);
    }
    const err = new createError[404]();
    return next(err);
  } catch (error) {
    const err = new createError[500]();
    return next(err);
  }
});

const middlewareExisteDocumento = existeDocumento({
  Modelo: Usuario,
  campos: ["documento", "email"],
});
router.post("/", middlewareExisteDocumento, async (req, res, next) => {
  try {
    if (!req.body || !Object.keys(req.body).length) {
      const err = new createError[400]("Falta el body");
      return next(err);
    }
    let { _id, password = null, ...restoDatosEntidad } = req.body;
    if (password && password.length) {
      password = await bcrypt.hash(password, 8);
      restoDatosEntidad = { ...restoDatosEntidad, password };
    }
    console.log(JSON.stringify({ restoDatosEntidad }, null, 2));
    let usuario = new Usuario(restoDatosEntidad);
    await usuario.save();
    usuario = removerPaswordDeRespuestas(usuario);
    return res.status(200).json(usuario);
  } catch (error) {
    return manejadorDeErrores({ error, next });
  }
});

const middlewareExisteEntidadConMismoDocumentoyDiferenteId = existeDocumento({
  Modelo: Usuario,
  campos: ["documento", { operador: "$ne", nombre: "_id" }],
});
router.put("/:_id", async (req, res, next) => {
  try {
    const { _id = null } = req.params;
    let { _id: id, password = null, ...datosNuevos } = req.body;
    if (!_id) {
      const err = new createError[400]("Falta el _id");
      return next(err);
    }
    let usuario = await Usuario.findById(_id);
    if (!usuario) {
      const err = new createError[404]();
      return next(err);
    }
    if (password && password.length) {
      password = await bcrypt.hash(password, 8);
      datosNuevos = { ...datosNuevos, password, _id };
    }
    usuario.set(datosNuevos);
    await usuario.save();
    usuario = removerPaswordDeRespuestas(usuario);
    return res.status(200).json(usuario);
  } catch (error) {
    if (error.code === 11000) {
      const err = new createError[409](
        `entidad ${JSON.stringify(
          req.body
        )} tiene campos que no permiten duplicación!`
      );
      return next(err);
    }
    const err = new createError[500]();
    return next(err);
  }
});

const eliminarHandler = eliminar({ Modelo: Usuario });
router.delete("/:_id", eliminarHandler);

module.exports = router;
