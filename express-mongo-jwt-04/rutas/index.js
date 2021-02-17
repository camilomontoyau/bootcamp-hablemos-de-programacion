const mascotas = require("./controllers/mascotas");
const consultas = require("./controllers/consultas");
const usuarios = require("./controllers/usuarios");
const login = require("./controllers/login");

module.exports = (app) => {
  app.use("/mascotas", mascotas);
  app.use("/consultas", consultas);
  app.use("/usuarios", usuarios);
  app.use("/login", login);
};
