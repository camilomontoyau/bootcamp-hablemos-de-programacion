const {
  crear,
  obtenerUno,
  listar,
  actualizar,
  eliminar,
} = require("../data-handler");
const directorioEntidad = "mascotas";

module.exports = function mascotasHandler() {
  return {
    get: async (data, callback) => {
      console.log("handler mascotas", { data });

      try {
        if (typeof data.indice !== "undefined") {
          const _mascota = await obtenerUno({
            directorioEntidad: "mascotas",
            nombreArchivo: data.indice,
          });
          if  (_mascota && _mascota.id) {
            return callback(200, _mascota);
          }
          return callback(404, {
            mensaje: `mascota con id ${data.indice} no encontrada`,
          });
        }

        const _mascotas = await listar({ directorioEntidad: "mascotas" });

        let respuestaMascotas = [..._mascotas];
        // verifico que data.query traiga datos
        // en tipo o nombre o dueno, esto significa
        //que el request es una búsqueda
        if (
          data.query &&
          (data.query.nombre || data.query.tipo || data.query.dueno)
        ) {
          // creo un array con las llaves del objeto data query
          const llavesQuery = Object.keys(data.query);

          // filtro el array de mascotas según los datos que tenga data.query
          respuestaMascotas = respuestaMascotas.filter((_mascota) => {
            // variable resultado cambiará a true cuando alguno de los campos de la _mascota esté en los criterios
            // de búsqueda es decir esté en alguno de los campos de data.query
            let resultado = false;

            // recorro cada una de las llaves de data.query para verificar cada uno de los campos
            // de cada mascota e incluirla o no en el resultado final
            for (const llave of llavesQuery) {
              // creo una expresión regular para que
              //la busqueda arroje resultados parciales
              //de lo que se manda como criterio de búsqueda
              // ejemplo si tipo = 'gat' en el query me devuelve todas las
              //mascotas con tipo = 'gato'
              const expresionRegular = new RegExp(data.query[llave], "ig");

              // resultado acá guarda la verificación de la expresión regular en cada uno de los campos
              resultado = _mascota[llave].match(expresionRegular);

              // si resultado es diferente a falso o null (.match entrega null cuando no hay match) entonces
              // rompemos (break) el ciclo for
              if (resultado) {
                break;
              }
            }

            // null es falsy por lo tanto el filter ignorará resultado === null
            // y los que si tengan el criterio de búsqueda entran al array respuestaMascotas
            return resultado;
          });
        }
        let respuesta = [];
        for (const mascota of respuestaMascotas) {
          respuesta = [
            ...respuesta,
            {
              ...mascota,
              dueno: await obtenerUno({
                directorioEntidad: "duenos",
                nombreArchivo: mascota.dueno,
              }),
            },
          ];
        }
        return callback(200, respuesta);
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
          directorioEntidad: "mascotas",
          nombreArchivo: data.indice,
          datosActuales,
        });
        if (resultado.id) {
          return callback(200, resultado);
        }
        if (resultado.message) {
          return callback(404, {
            mensaje: `mascota con indice ${data.indice} no encontrada`,
          });
        }
        return callback(500, { mensaje: "error al actualizar" });
      }
      callback(400, { mensaje: "falta id" });
    },
    delete: async (data, callback) => {
      if (typeof data.indice !== "undefined") {
        const resultado = await eliminar({
          directorioEntidad: "mascotas",
          nombreArchivo: data.indice,
        });
        if (resultado.message) {
          return callback(404, {
            mensaje: `mascota con indice ${data.indice} no encontrada`,
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
