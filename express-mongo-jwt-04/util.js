const createError = require("http-errors");
const lodash = require("lodash");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const manejadorDeErrores = ({ error, next }) => {
  let err = null;
  console.error(JSON.stringify({ error }, null, 2));
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
    case "TokenExpiredError":
      err = new createError.Unauthorized(error.message);
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


const jwtVerifyPromise = ({ token = null, secret = null, options = {} }) =>
  new Promise((resolve, reject) => {
    if (!token || !secret)
      return reject(new Error("token no se puede verificar"));
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      if (decoded) return resolve(decoded);
      reject(new Error("no se decofica token"));
    });
  });

const jwtSignPromise = ({ data = null, secret = null, options = {} }) =>
  new Promise((resolve, reject) => {
    if (!data || !secret) return reject(new Error("jwt incompleto"));
    jwt.sign(data, secret, options, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });



module.exports = {
  manejadorDeErrores,
  removerPaswordDeRespuestas,
  jwtSignPromise,
  jwtVerifyPromise,
};
