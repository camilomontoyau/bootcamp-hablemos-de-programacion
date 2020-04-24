const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
const veterinarias = require("./rutas/veterinarias");
const duenos = require("./rutas/duenos");

module.exports = {
  ruta: (data, callback) => {
    callback(200, { mensaje: "esta es /ruta" });
  },
  mascotas: mascotas(recursos.mascotas),
  veterinarias: veterinarias(recursos.veterinarias),
  duenos: duenos(recursos.duenos),
  noEncontrado: (data, callback) => {
    callback(404, { mensaje: "no encontrado" });
  },
};
