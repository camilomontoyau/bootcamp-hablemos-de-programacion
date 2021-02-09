const mascotas = require("./controllers/mascotas");
const duenos = require("./controllers/duenos");
const veterinarias = require("./controllers/veterinarias");
const consultas = require("./controllers/consultas");
const usuarios = require("./controllers/usuarios");

module.exports = (app) => {
  app.use("/mascotas", mascotas);
  app.use("/duenos", duenos);
  app.use("/veterinarias", veterinarias);
  app.use("/consultas", consultas);
  app.use("/usuarios", usuarios);
};
