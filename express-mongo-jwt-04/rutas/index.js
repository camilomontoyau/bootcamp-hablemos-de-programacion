const mascotas = require("./controllers/mascotas");
const consultas = require("./controllers/consultas");
const usuarios = require("./controllers/usuarios");
const login = require("./controllers/login");
const { estaAutenticado } = require("./../util");
const { middlewareEstaAutorizado } = require("./controllers/genericos");


module.exports = (app) => {
  app.use("/login", login);
  app.use(estaAutenticado);
  app.use("/mascotas", mascotas);
  app.use("/consultas", consultas);
  app.use(
    "/usuarios",
    middlewareEstaAutorizado({
      tiposUsuario: ["administrador", "veterinaria"],
    }),
    usuarios
  );
};
