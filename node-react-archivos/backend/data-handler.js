const fs = require("fs");
const path = require("path");
const directorioBase = path.join(__dirname, "data");

const dataHandler = {
  crear: async ({
    directorioEntidad = "mascotas",
    nombreArchivo,
    datosGuardar,
  }) => {
    try {
      const fileDescriptor = await fs.promises.open(
        `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`,
        "wx"
      );
      const datosEnString = JSON.stringify(datosGuardar);
      await fs.promises.writeFile(fileDescriptor, datosEnString);
      return datosGuardar;
    } catch (error) {
      return error;
    }
  },
  obtenerUno: async ({
    directorioEntidad = "mascotas",
    nombreArchivo,
    agregarExtension = true,
  }) => {
    try {
      let archivo = null;
      if (agregarExtension) {
        archivo = `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`;
      } else {
        archivo = `${directorioBase}/${directorioEntidad}/${nombreArchivo}`;
      }
      const resultado = await fs.promises.readFile(archivo, {
        encoding: "utf-8",
      });
      const resultadoJSON = JSON.parse(resultado);
      return resultadoJSON;
    } catch (error) {
      return new Error("No se pudo leer el archivo o no existe");
    }
  },
  listar: async ({ directorioEntidad = "mascotas" }) => {
    try {
      let archivos = await fs.promises.readdir(
        `${directorioBase}/${directorioEntidad}/`
      );
      archivos = archivos.filter((file) => file.includes(".json"));
      const arrayPromesasLeerArchivo = archivos.map((archivo) => {
        return dataHandler.obtenerUno({
          directorioEntidad,
          nombreArchivo: archivo,
          agregarExtension: false,
        });
      });
      const datosArchivos = await Promise.all(arrayPromesasLeerArchivo);
      return datosArchivos;
    } catch (error) {
      return new Error(`No se pude listar desde ${directorioBase}`);
    }
  },
  actualizar: async ({
    directorioEntidad = "mascotas",
    nombreArchivo,
    datosActuales,
  }) => {
    try {
      const rutaCompleta = `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`;
      const existeArchivo = fs.existsSync(rutaCompleta);
      if (!existeArchivo) {
        throw new Error(`La entidad con id = ${nombreArchivo} no existe`);
      }
      const datosAnterioresJSON = await dataHandler.obtenerUno({
        directorioEntidad,
        nombreArchivo,
      });
      
      const resultadoEliminar = await fs.promises.unlink(rutaCompleta);
      console.log({ resultadoEliminar });

      const fileDescriptor = await fs.promises.open(rutaCompleta, "wx");
      const datosFinalesParaGuardar = {
        ...datosAnterioresJSON,
        ...datosActuales,
      };
      const datosEnString = JSON.stringify(datosFinalesParaGuardar);
      await fs.promises.writeFile(fileDescriptor, datosEnString);
      return datosFinalesParaGuardar;
    } catch (error) {
      return error;
    }
  },
  eliminar: async ({ directorioEntidad = "mascotas", nombreArchivo }) => {
    try {
      const rutaCompleta = `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`;
      const existeArchivo = fs.existsSync(rutaCompleta);
      if (!existeArchivo) {
        throw new Error(`La entidad con id = ${nombreArchivo} no existe`);
      }
      const resultadoEliminar = await fs.promises.unlink(rutaCompleta);
      return { mensaje: true };
    } catch (error) {
      return error;
    }
  },
};

module.exports = dataHandler;
