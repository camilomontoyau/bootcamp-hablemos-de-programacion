const mascotas = require("./mascotas");

module.exports = (app) => {
  app.use("/mascotas", mascotas);
};
