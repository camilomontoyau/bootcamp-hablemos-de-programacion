const mascotas = require("./mascotas");
const duenos = require("./duenos");
const veterinarias = require("./veterinarias");

module.exports = (app) => {
  app.use("/mascotas", mascotas);
  app.use("/duenos", duenos);
  app.use("/veterinarias", veterinarias);
};
