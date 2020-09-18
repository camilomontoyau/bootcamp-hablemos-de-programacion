const {
  crear,
  obtenerUno,
  listar,
  actualizar,
  eliminar,
} = require("../data-handler");
const directorioEntidad = "duenos";
const { palabraSinAcentos } = require("../util");

module.exports = function duenosHandler(duenos) {
  return {
    get: async (data, callback) => {
      console.log("handler duenos", { data });
      try {
        if (typeof data.indice !== "undefined") {
          const _dueno = await obtenerUno({
            directorioEntidad,
            nombreArchivo: data.indice,
          });

          if (_dueno && _dueno.id) {
            return callback(200, _dueno);
          }

          return callback(404, {
            mensaje: `dueno con id ${data.indice} no encontrado`,
          });
        }

        const _duenos = await listar({ directorioEntidad: "duenos" });

        if (
          data.query &&
          (data.query.nombre || data.query.apellido || data.query.documento)
        ) {
          const llavesQuery = Object.keys(data.query);
          let respuestaDuenos = [..._duenos];
          respuestaDuenos = respuestaDuenos.filter((_dueno) => {
            let resultado = false;
            for (const llave of llavesQuery) {
              const busqueda = palabraSinAcentos(data.query[llave]);
              const expresionRegular = new RegExp(busqueda, "ig");
              const campoDuenoSinAcentos = palabraSinAcentos(_dueno[llave]);
              resultado = campoDuenoSinAcentos.match(expresionRegular);
              if (resultado) {
                break;
              }
            }
            return resultado;
          });
          return callback(200, respuestaDuenos);
        }
        callback(200, _duenos);
      } catch (error) {
        if (error) {
          console.log(error);
          return callback(500, { mensaje: error.message });
        }
      }
    },
    post: async (data, callback) => {
      if (data && data.payload && data.payload.id) {
        const resultado = await crear({
          directorioEntidad,
          nombreArchivo: data.payload.id,
          datosGuardar: data.payload,
        });
        return callback(201, resultado);
      }
      callback(400, {
        mensaje:
          "hay un error porque no se envió el payload o no se creó el id",
      });
    },
    put: async (data, callback) => {
      if (typeof data.indice !== "undefined") {
        const datosActuales = { ...data.payload, id: data.indice };
        const resultado = await actualizar({
          directorioEntidad,
          nombreArchivo: data.indice,
          datosActuales,
        });
        if (resultado.id) {
          return callback(200, resultado);
        }

        if (resultado.message) {
          return callback(404, {
            mensaje: `dueño con indice ${data.indice} no encontrada`,
          });
        }
      }
      callback(400, { mensaje: "falta id" });
    },
    delete: async (data, callback) => {
      if (typeof data.indice !== "undefined") {
        const resultado = await eliminar({
          directorioEntidad,
          nombreArchivo: data.indice,
        });
        if (resultado.message) {
          return callback(404, {
            mensaje: `dueño con id ${data.indice} no encontrado`,
          });
        }

        if (resultado.mensaje) {
          return callback(204);
        }

        return callback(500, { mensaje: "error al eliminar" });
      }
      callback(400, { mensaje: "falta id" });
    },
  };
};
