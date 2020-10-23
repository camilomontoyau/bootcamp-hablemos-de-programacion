const mascotas = require("./mascotas");
const duenos = require("./duenos");
const veterinarias = require("./veterinarias");
const consultas = require("./consultas");

module.exports = (app) => {
  app.use("/mascotas", mascotas);
  app.use("/duenos", duenos);
  app.use("/veterinarias", veterinarias);
  app.use("/consultas", consultas);
};
