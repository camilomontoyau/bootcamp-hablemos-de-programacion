const mascotas = require("./controllers/mascotas");
const duenos = require("./controllers/duenos");
const veterinarias = require("./controllers/veterinarias");
const consultas = require("./controllers/consultas");

module.exports = (app) => {
  app.use("/mascotas", mascotas);
  app.use("/duenos", duenos);
  app.use("/veterinarias", veterinarias);
  app.use("/consultas", consultas);
};
