const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
const veterinarias = require("./rutas/veterinarias");
const duenos = require("./rutas/duenos");
const consultas = require("./rutas/consultas");
const path = require("path");
const fs = require("fs");

module.exports = {
  ruta: (data, callback) => {
    callback(200, { mensaje: "esta es /ruta" });
  },
  mascotas: mascotas(recursos.mascotas),
  veterinarias: veterinarias(recursos.veterinarias),
  duenos: duenos(recursos.duenos),
  consultas: consultas(recursos),
  index: {
    get: (_data, callback) => {
      const rutaIndexHtml = path.join(__dirname, "publico", "index.html");
      const existeArchivo = fs.existsSync(rutaIndexHtml);
      if (existeArchivo) {
        const respuesta = fs.createReadStream(rutaIndexHtml);
        return callback(200, respuesta);
      }
      callback(404, { mensaje: "no encontrado" });
    },
  },
  noEncontrado: (data, callback) => {
    callback(404, { mensaje: "no encontrado" });
  },
};
