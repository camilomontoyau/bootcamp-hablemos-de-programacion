const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
const veterinarias = require("./rutas/veterinarias");
const duenos = require("./rutas/duenos");
const consultas = require("./rutas/consultas");
const fs = require("fs");
const path = require("path");

const handlerArchivos = (_data, callback) => {
  const rutaIndexHtml = path.join(__dirname, "publico", "index.html");
  const existeArchivo = fs.existsSync(rutaIndexHtml);
  console.log({ rutaIndexHtml, existeArchivo });
  const respuesta = fs.createReadStream(rutaIndexHtml);
  callback(200, respuesta);
};

module.exports = {
  ruta: (data, callback) => {
    callback(200, { mensaje: "esta es /ruta" });
  },
  mascotas: mascotas(recursos.mascotas),
  veterinarias: veterinarias(recursos.veterinarias),
  duenos: duenos(recursos.duenos),
  consultas: consultas(recursos),
  "index.html": {
    get: primerNivel,
  },
  noEncontrado: (data, callback) => {
    callback(404, { mensaje: "no encontrado" });
  },
};
