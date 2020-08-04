module.exports = function duenosHandler(duenos) {
  return {
    get: (data, callback) => {
      console.log("handler duenos", { data });
      if (typeof data.indice !== "undefined") {
        if (duenos[data.indice]) {
          return callback(200, duenos[data.indice]);
        }
        return callback(404, {
          mensaje: `dueno con indice ${data.indice} no encontradO`,
        });
      }
      if (
        data.query &&
        (typeof data.query.nombre !== "undefined" ||
          data.query.apellido !== "undefined" ||
          data.query.documento !== "undefined")
      ) {
        const llavesQuery = Object.keys(data.query);

        let respuestaDuenos = [...duenos];

        for (const llave of llavesQuery) {
          respuestaDuenos = respuestaDuenos.filter((_dueno) => {
            const expresionRegular = new RegExp(data.query[llave], "ig");
            const resultado = _dueno[llave].match(expresionRegular);
            return resultado;
          });
        }
        return callback(200, respuestaDuenos);
      }
      callback(200, duenos);
    },
    post: (data, callback) => {
      duenos.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (duenos[data.indice]) {
          duenos[data.indice] = data.payload;
          return callback(200, duenos[data.indice]);
        }
        return callback(404, {
          mensaje: `dueno con indice ${data.indice} no encontrado`,
        });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    delete: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (duenos[data.indice]) {
          duenos = duenos.filter((_dueno, indice) => indice != data.indice);
          return callback(204, {
            mensaje: `elemento con indice ${data.indice} eliminado`,
          });
        }
        return callback(404, {
          mensaje: `dueno con indice ${data.indice} no encontrado`,
        });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
  };
};
