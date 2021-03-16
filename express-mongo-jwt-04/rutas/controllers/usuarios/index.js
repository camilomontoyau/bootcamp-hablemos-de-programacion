const router = require("express").Router();
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const Usuario = require("./schema");
const {
  manejadorDeErrores,
  removerPaswordDeRespuestas,
} = require("../../../util");

const { existeDocumento, filtrarEntidades } = require("../genericos");

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
    return manejadorDeErrores({ error, next });
  }
});

router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { user } = req;
    let usuario = null;
    switch (user.tipo) {
      case "administrador":
        usuario = await Usuario.findById(_id);
        break;

      case "veterinaria":
        usuario = await Usuario.findOne({
          _id,
          $and: [{ $or: [{ _id: user._id }, { tipo: "dueno" }] }],
        });
        break;
    }
    if (usuario) {
      usuario = removerPaswordDeRespuestas(usuario);
      return res.status(200).json(usuario);
    }
    const err = new createError[404]();
    return next(err);
  } catch (error) {
    return manejadorDeErrores({ error, next });
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
    const { user } = req;
    if (user.tipo === "veterinaria" && restoDatosEntidad.tipo !== "dueno") {
      const err = new createError[403](
        "No está autorizado a crear este tipo de usuario"
      );
      return next(err);
    }

    if (password && password.length) {
      password = await bcrypt.hash(password, 8);
      restoDatosEntidad = { ...restoDatosEntidad, password };
    }
    let usuario = new Usuario(restoDatosEntidad);
    await usuario.save();
    usuario = removerPaswordDeRespuestas(usuario);
    return res.status(200).json(usuario);
  } catch (error) {
    return manejadorDeErrores({ error, next });
  }
});

router.put("/:_id", async (req, res, next) => {
  try {
    const { _id = null } = req.params;
    let { _id: id, password = null, ...datosNuevos } = req.body;
    const { user } = req;
    if (!_id) {
      const err = new createError[400]("Falta el _id");
      return next(err);
    }
    let usuario = await Usuario.findById(_id);

    if (datosNuevos.documento && usuario.documento != datosNuevos.documento) {
      const existeUsuarioConElMismoDocumento = await Usuario.findOne({
        _id: { $ne: _id },
        documento: datosNuevos.documento,
      });
      if (
        existeUsuarioConElMismoDocumento &&
        existeUsuarioConElMismoDocumento._id
      ) {
        const err = new createError[409](
          `ya existe un usuario con documento ${datosNuevos.documento}!`
        );
        return next(err);
      }
    }
    
    const esVeterinaria = user.tipo === "veterinaria";
    const seEstaModificandoAsiMisma = user._id === _id;
    const puedeModificarElUsuario =
      esVeterinaria &&
      (seEstaModificandoAsiMisma ||
        (usuario.tipo === "dueno" && datosNuevos.tipo === "dueno"));

    if (esVeterinaria && !puedeModificarElUsuario) {
      const err = new createError[403](
        "No está autorizado a modificar este usuario"
      );
      return next(err);
    }

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
    return manejadorDeErrores({ error, next });
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id = null } = req.params;
    if (!_id) {
      const err = new createError[400]("Falta el _id");
      return next(err);
    }
    const usuarioABorrar = await Usuario.findById(_id);
    if (!usuarioABorrar) {
      const err = new createError[404]();
      return next(err);
    }
    const { user } = req;
    if (user.tipo === "veterinaria" && usuarioABorrar.tipo !== "dueno") {
      const err = new createError[403]();
      return next(err);
    }
    const resultado = await usuarioABorrar.deleteOne();
    if (resultado._id === usuarioABorrar._id) {
      return res.status(204).send();
    }
    const err = new createError[500]();
    return next(err);
  } catch (error) {
    return manejadorDeErrores({ error, next });
  }
});

module.exports = router;
