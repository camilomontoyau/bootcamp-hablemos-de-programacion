const { palabraSinAcentos } = require("../util");

module.exports = function veterinariasHandler(veterinarias) {
  return {
    get: (data, callback) => {
      console.log("handler veterinarias", { data });
      if (typeof data.indice !== "undefined") {
        if (veterinarias[data.indice]) {
          return callback(200, veterinarias[data.indice]);
        }
        return callback(404, {
          mensaje: `veterinaria con indice ${data.indice} no encontrada`,
        });
      }
      // verifico que data.query traiga datos
      // en nombre o apellido o documento, esto significa
      // que el request es una búsqueda
      if (
        data.query &&
        (data.query.nombre || data.query.apellido || data.query.documento)
      ) {
        // creo un array con las llaves del objeto data query
        const llavesQuery = Object.keys(data.query);

        //clono el array de veterinarias que viene de recursos
        // y este irá guardando los resultados filtrados posteriormente
        let respuestaVeterinarias = [...veterinarias];

        // filtro el array de veterinarias según los datos que tenga data.query
        respuestaVeterinarias = respuestaVeterinarias.filter((_veterinaria) => {
          // variable resultado cambiará a true cuando alguno de los campos de la _veterinaria esté en los criterios
          // de búsqueda es decir esté en alguno de los campos de data.query
          let resultado = false;

          // recorro cada una de las llaves de data.query para verificar cada uno de los campos
          // de cada veterinaria e incluirla o no en el resultado final
          for (const llave of llavesQuery) {
            // Quitamos los acentos a las palabras que los tienen
            const busqueda = palabraSinAcentos(data.query[llave]);
            // creo una expresión regular para que
            //la busqueda arroje resultados parciales
            //de lo que se manda como criterio de búsqueda
            // ejemplo si nombre = 'alex' en el query me devuelve todas las
            // veterinatias con nombre = 'alex' o 'alexander', etc
            const expresionRegular = new RegExp(busqueda, "ig");

            const campoVeterinariaSinAcentos = palabraSinAcentos(
              _veterinaria[llave]
            );

            // resultado acá guarda la verificación de la expresión regular en cada uno de los campos
            resultado = campoVeterinariaSinAcentos.match(expresionRegular);

            // si resultado es diferente a falso o null (.match entrega null cuando no hay match) entonces
            // rompemos (break) el ciclo for
            if (resultado) {
              break;
            }
          }

          // null es falsy por lo tanto el filter ignorará resultado === null
          // y los que si tengan el criterio de búsqueda entran al array respuestaVeterinarias
          return resultado;
        });
        return callback(200, respuestaVeterinarias);
      }
      callback(200, veterinarias);
    },
    post: (data, callback) => {
      veterinarias.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (veterinarias[data.indice]) {
          veterinarias[data.indice] = data.payload;
          return callback(200, veterinarias[data.indice]);
        }
        return callback(404, {
          mensaje: `veterinaria con indice ${data.indice} no encontrada`,
        });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    delete: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (veterinarias[data.indice]) {
          veterinarias = veterinarias.filter(
            (_veterinaria, indice) => indice != data.indice
          );
          return callback(204, {
            mensaje: `elemento con indice ${data.indice} eliminado`,
          });
        }
        return callback(404, {
          mensaje: `veterinaria con indice ${data.indice} no encontrada`,
        });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
  };
};
