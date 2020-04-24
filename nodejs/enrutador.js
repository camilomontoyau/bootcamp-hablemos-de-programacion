const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");

module.exports = {
  ruta: (data, callback) => {
    callback(200, { mensaje: "esta es /ruta" });
  },
  mascotas: mascotas(recursos.mascotas),
  noEncontrado: (data, callback) => {
    callback(404, { mensaje: "no encontrado" });
  },
};
