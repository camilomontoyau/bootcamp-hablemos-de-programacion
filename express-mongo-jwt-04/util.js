const createError = require("http-errors");
const lodash = require("lodash");

const manejadorDeErrores = ({ error, next }) => {
  let err = null;
  switch (error.name) {
    case "ValidationError":
      const errors = Object.entries(error.errors)
        .map((elementoError) => {
          const mensaje = lodash.get(elementoError, "1.message", "");
          return mensaje;
        })
        .join(" ");
      err = new createError[400](errors);
      break;
    default:
      err = new createError[500](error.message);
  }
  return next(err);
};

const removerPaswordDeRespuestas = (objeto) => {
  if (!(typeof objeto.toJSON === "function"))
    throw new Error("no es instancia de mongoose");
  objeto = objeto.toJSON();
  const { password, ...resto } = objeto;
  return resto;
};

module.exports = {
  manejadorDeErrores,
  removerPaswordDeRespuestas,
};
