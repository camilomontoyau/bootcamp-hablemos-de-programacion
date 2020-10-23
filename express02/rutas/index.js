const mascotas = require("./mascotas");
const duenos = require("./duenos");

module.exports = (app) => {
  app.use("/mascotas", mascotas);
  app.use("/duenos", duenos);
};
