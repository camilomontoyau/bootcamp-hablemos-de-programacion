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
        (typeof data.query.nombre !== "undefined" ||
          data.query.tipo !== "undefined" ||
          data.query.dueno !== "undefined")
      ) {
        // creo un array con las llavees del objeto data query
        const llavesQuery = Object.keys(data.query);

        //clono el array de mascotas que viene de recursos
        // y este irá guardando los resultados
        let respuestaMascotas = [...mascotas];

        //recorro cada una de las llaves con el fin de filtrar el array de mascotas
        //según los criterios de búsqueda
        for (const llave of llavesQuery) {
          // filtro el array de respuestas con el finde solamente
          // dejar los objetos de mascota que cumplen con los criterios de
          // búsqueda
          respuestaMascotas = respuestaMascotas.filter((_mascota) => {
            // creo una expresión regular para que
            //la busqueda arroje resultados parciales
            //de lo que se manda como criterio de búsqueda
            // ejemplo si tipo = 'gat' en el query me devuelve todas las
            //mascotas con tipo = 'gato'
            const expresionRegular = new RegExp(data.query[llave], "ig");

            // resultado guarda la verificación del string del criterio de búsqueda
            // y los objetos de mascota, es decir nos dice si el criterio de búsqueda
            // está o no en el objeto de mascota que estamos evaluando en el momento
            const resultado = _mascota[llave].match(expresionRegular);

            // resultado entrega null cuando no encuentra el criterio de búsqueda
            // null es falsy por lo tanto el filter ignorará resultado === null
            // y los que si tengan el criterio de búsqueda entran al array respuestaMascotas
            return resultado;
          });
        }
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
