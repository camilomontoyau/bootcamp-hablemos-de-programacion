const createError = require("http-errors");
const lodash = require("lodash");
const jwt = require("jsonwebtoken");
const mascotas = require("./controllers/mascotas");
const consultas = require("./controllers/consultas");
const usuarios = require("./controllers/usuarios");
const login = require("./controllers/login");
const { getMaxListeners } = require("./controllers/mascotas/schema");
const SECRET_KEY = process.env.SECRET_KEY;


const estaAutenticado = (req, res, next) => {
  let auth = lodash.get(req, "headers.authorization", null);
  if (!auth && auth.length) {
    const err = new createError.Unauthorized("Falta el token");
    return next(err);
  }
  const [_bearer, token] = auth.split(" ");
  console.log({ auth, _bearer, token });
  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      console.log({ error });
      const err = new createError[500]("error al verificar token");
      return next(err);
    }
    if  (decoded) {
      console.log({  decoded  });
      next();
    }
  });
};

module.exports = (app) => {
  app.use("/login", login);
  app.use(estaAutenticado);
  app.use("/mascotas", mascotas);
  app.use("/consultas", consultas);
  app.use("/usuarios", usuarios);
};
