const createError = require("http-errors");
const lodash = require("lodash");
const mascotas = require("./controllers/mascotas");
const consultas = require("./controllers/consultas");
const usuarios = require("./controllers/usuarios");
const login = require("./controllers/login");


const estaAutenticado = (req, res, next) => {
  const auth = lodash.get(req, "headers.authorization", null);
  if (!auth) {
    const err = new createError.Unauthorized("Falta el token");
    next(err);
  }

  next();
};

module.exports = (app) => {
  app.use("/login", login);
  app.use(estaAutenticado);
  app.use("/mascotas", mascotas);
  app.use("/consultas", consultas);
  app.use("/usuarios", usuarios);
};
