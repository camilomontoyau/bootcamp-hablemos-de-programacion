const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
const veterinarias = require("./rutas/veterinarias");
const duenos = require("./rutas/duenos");
const consultas = require("./rutas/consultas");
const fs = require("fs");
const path = require("path");

const handlerArchivos = (data, callback) => {
  const rutaArchivo = path.join(__dirname, "publico", data.ruta);
  const existeArchivo = fs.existsSync(rutaArchivo);
  console.log({ rutaArchivo, existeArchivo });
  const respuesta = fs.createReadStream(rutaArchivo);
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
    get: handlerArchivos,
  },
  "manifest.json": {
    get: handlerArchivos,
  },
  "favicon.ico": {
    get: handlerArchivos,
  },
  noEncontrado: (data, callback) => {
    callback(404, { mensaje: "no encontrado" });
  },
};
