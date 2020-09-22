const {
  crear,
  obtenerUno,
  listar,
  actualizar,
  eliminar,
} = require("../data-handler");

const directorioEntidad = "consultas";
module.exports = function consultasHandler({
  consultas,
}) {
  return {
    get: async (data, callback) => {
      console.log("handler consultas", { data });
      if (typeof data.indice !== "undefined") {
        const _consulta = await obtenerUno({
          directorioEntidad,
          nombreArchivo: data.indice,
        });

        if (_consulta && _consulta.id) {
          return callback(200, _consulta);
        }

        return callback(404, {
          mensaje: `consulta con id ${data.indice} no fue encontrada`,
        });
      }
      
      let _consultas = await listar({ directorioEntidad });

      if (
        data.query &&
        (data.query.mascota ||
          data.query.veterinaria ||
          data.query.historia ||
          data.query.diagnostico)
      ) {
        const llavesQuery = Object.keys(data.query);
        _consultas = _consultas.filter((_consulta) => {
          let resultado = false;
          for (const llave of llavesQuery) {
            if (llave === "fechaEdicion" || llave === "fechaCreacion") {
              continue;
            }

            if (
              (llave === "diagnostico" || llave === "historia") &&
              data.query[llave]
            ) {
              const expresionRegular = new RegExp(data.query[llave], "ig");
              resultado = _consulta[llave].match(expresionRegular);
            }
            if (llave === "veterinaria" || llave === "mascota") {
              resultado = _consulta[llave] == data.query[llave];
            }
            if (resultado) {
              break;
            }
          }
          return resultado;
        });
      }
      let respuesta = [];
      for(const consulta of _consultas) {
        respuesta = [
          ...respuesta, 
          {
            ...consulta,
            mascota: await obtenerUno({
              directorioEntidad: "mascotas",
              nombreArchivo: consulta.mascota,
            }),
            veterinaria: await obtenerUno({
              directorioEntidad: "veterinarias",
              nombreArchivo: consulta.veterinaria,
            })
          }]
      }
      
      callback(200, respuesta);
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
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (consultas[data.indice]) {
          const { fechaCreacion } = consultas[data.indice];
          consultas[data.indice] = {
            ...data.payload,
            fechaCreacion,
            fechaEdicion: new Date(),
          };
          return callback(200, consultas[data.indice]);
        }
        return callback(404, {
          mensaje: `consulta con indice ${data.indice} no encontrado`,
        });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    delete: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (consultas[data.indice]) {
          consultas = consultas.filter(
            (_consulta, indice) => indice != data.indice
          );
          return callback(204, {
            mensaje: `elemento con indice ${data.indice} eliminado`,
          });
        }
        return callback(404, {
          mensaje: `consulta con indice ${data.indice} no encontrado`,
        });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
  };
};