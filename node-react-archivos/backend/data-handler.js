const fs = require("fs");
const path = require("path");
const { dir } = require("console");

const directorioBase = path.join(__dirname, "data");

const dataHandler = {
  crear: (
    { directorioEntidad = "mascotas", nombreArchivo, datosGuardar },
    callback
  ) => {
    fs.open(
      `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`,
      "wx",
      (error, fileDescriptor) => {
        if (!error && fileDescriptor) {
          const datosEnString = JSON.stringify(datosGuardar);
          fs.writeFile(fileDescriptor, datosEnString, (error2) => {
            if (error2) {
              return callback(
                new Error("Error al intentar escribir en el archivo nuevo")
              );
            }
            fs.close(fileDescriptor, (error3) => {
              if (error3) {
                return callback(new Error("Error al cerrar archivo"));
              }
              callback(false);
            });
          });
        } else {
          callback(new Error("No se pudo crear el archivo o ya existe"));
        }
      }
    );
  },
  obtenerUno: ({ directorioEntidad = "mascotas", nombreArchivo }, callback) => {
    fs.readFile(
      `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`,
      "utf-8",
      (error, dataArchivo) => {
        if (error) {
          return callback(new Error("No se pudo leer el archivo o no existe"));
        }
        return callback(false, dataArchivo);
      }
    );
  },
  listar: ({ directorioEntidad = "mascotas" }, callback) => {
    fs.readdir(
      `${directorioBase}/${directorioEntidad}/`,
      async (error, files) => {
        if (error) {
          return callback(
            new Error(`No se pude listar desde ${directorioBase}`)
          );
        }
        files = files.filter((file) => file.includes(".json"));
        console.log({ files });
        const arrayPromesasLeerArchivo = files.map((file) => {
          return fs.promises.readFile(
            `${directorioBase}/${directorioEntidad}/${file}`,
            { encoding: "utf-8" }
          );
        });
        let datosArchivos = await Promise.all(arrayPromesasLeerArchivo);
        datosArchivos = datosArchivos.map(JSON.parse);
        return callback(false, datosArchivos);
      }
    );
  },
};

dataHandler.listar({}, () => {});

module.exports = dataHandler;
