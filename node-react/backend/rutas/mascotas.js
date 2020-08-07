module.exports = function mascotasHandler(mascotas) {
  return {
    get: (data, callback) => {
      console.log("handler mascotas", { data });
      if (typeof data.indice !== "undefined") {
        if (mascotas[data.indice]) {
          return callback(200, mascotas[data.indice]);
        }
        return callback(404, {
          mensaje: `mascota con indice ${data.indice} no encontrada`,
        });
      }

      // verifico que data.query traiga datos
      // en tipo o nombre o dueno, esto significa
      //que el request es una búsqueda
      if (
        data.query &&
        (data.query.nombre || data.query.tipo || data.query.dueno)
      ) {
        // creo un array con las llaves del objeto data query
        const llavesQuery = Object.keys(data.query);

        //clono el array de mascotas que viene de recursos
        // y este irá guardando los resultados
        let respuestaMascotas = [...mascotas];

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

        return callback(200, respuestaMascotas);
      }
      callback(200, mascotas);
    },
    post: (data, callback) => {
      mascotas.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (mascotas[data.indice]) {
          mascotas[data.indice] = data.payload;
          return callback(200, mascotas[data.indice]);
        }
        return callback(404, {
          mensaje: `mascota con indice ${data.indice} no encontrada`,
        });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    delete: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (mascotas[data.indice]) {
          mascotas = mascotas.filter(
            (_mascota, indice) => indice != data.indice
          );
          return callback(204, {
            mensaje: `elemento con indice ${data.indice} eliminado`,
          });
        }
        return callback(404, {
          mensaje: `mascota con indice ${data.indice} no encontrada`,
        });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
  };
};
