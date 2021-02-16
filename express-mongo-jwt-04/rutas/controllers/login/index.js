const createError = require("http-errors");
const router = require("express").Router();
const Usuario = require("../usuarios/schema");

router.post("/", async (req, res, next) => {
  const { password = null, email = null } = req.body;
  let err = null;
  if (password && password.length > 0 && email && email.length > 0) {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      err = new createError[400]("email o password errados");
      return next(err);
    }
    if (usuario.password === password) {
      // logica para cuando el usuario está logueado correctamente
    }

    if (existeDueno) {
      return crearHandler(req, res);
    }
  }
});

module.exports = router;
