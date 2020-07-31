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
      if (
        data.query &&
        (typeof data.query.nombre !== "undefined" ||
          data.query.tipo !== "undefined" ||
          data.query.dueno !== "undefined")
      ) {
        const llavesQuery = Object.keys(data.query);
        let respuestaMascotas = [...mascotas];
        for (const llave of llavesQuery) {
          respuestaMascotas = respuestaMascotas.filter((_mascota) => {
            const expresionRegular = new RegExp(data.query[llave], "ig");
            const resultado = _mascota[llave].match(expresionRegular);
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
