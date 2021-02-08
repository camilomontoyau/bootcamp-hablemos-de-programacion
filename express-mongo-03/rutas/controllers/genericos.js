const createError = require("http-errors");
const lodash = require("lodash");

const listar = function closureListar({Modelo = null, populate = []}) {
  return async function closureHandlerListar(req, res, next) {
    try {
      if (!Modelo) {
        throw new Error("No se envió modelo");
      }
      const filtro = filtrarEntidades(Modelo, req.query);
      let promesaLista = Modelo.find(filtro);
      if (Array.isArray(populate) && populate.length > 0) {
        for (const entidadAnidada of populate) {
          promesaLista = promesaLista.populate(entidadAnidada);
        }
      }
      const resultados = await promesaLista;
      return res.status(200).json(resultados);
    } catch (error) {
      const err = new createError[500]();
      return next(err);
    }
  };
};

const obtenerUno = function closureObtenerUno({Modelo = null}) {
  return async function closureHandlerObtenerUno(req, res, next) {
    try {
      if (!Modelo) {
        throw new Error("No se envió modelo");
      }
      const { _id } = req.params;
      const entidad = await Modelo.findById(_id);
      if (entidad) {
        return res.status(200).json(entidad);
      }
      const err = new createError[404]();
      return next(err);
    } catch (error) {
      const err = new createError[500]();
      return next(err);
    }
  };
};

const crear = function closureCrearEntidad({ Modelo = null }) {
  return async function closureHandlerCrearEntidad(req, res, next) {
    try {
      if (!Modelo) {
        throw new Error("No se envió modelo");
      }
      if (!req.body) {
        return res.status(400).json({ mensaje: "Falta el body" });
      }
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ mensaje: "Falta el body" });
      }
      const { _id, ...restoDatosEntidad } = req.body;
      const entidad = new Modelo(restoDatosEntidad);
      await entidad.save();
      return res.status(200).json(entidad);
    } catch (error) {
      const err = new createError[500]();
      return next(err);
    }
  };
};

const actualizar = function closureEditarEntidad({ Modelo = null }) {
  return async function closureHandlerEditarEntidad(req, res, next) {
    try {
      if (!Modelo) {
        throw new Error("No se envió modelo");
      }
      const { _id = null } = req.params;
      const { _id: id, ...datosNuevos } = req.body;
      if (!_id) {
        return res.status(400).json({ mensaje: "falta id" });
      }
      const entidad = await Modelo.findById(_id);
      console.log({ entidad });
      if (!entidad) {
        return res.status(404).json({ mensaje: "no encontrado" });
      }
      entidad.set(datosNuevos);
      await entidad.save();
      return res.status(200).json(entidad);
    } catch (error) {
      if (error.code === 11000) {
        const err = new createError[400]();
        return next(err);
      }
      const err = new createError[500]();
      return next(err);
    }
  };
};

const eliminar = function closureEliminarEntidad({ Modelo = null }) {
  return async function closureHandlerEliminarEntidad(req, res, next) {
    try {
      if (!Modelo) {
        throw new Error("No se envió modelo");
      }
      const { _id = null } = req.params;
      if (!_id) {
        return res.status(400).json({ mensaje: "falta id" });
      }
      const entidadBorrada = await Modelo.remove({ _id });
      if (entidadBorrada.deletedCount === 1) {
        return res.status(204).send();
      } else {
        res.status(404).json({ mensaje: "no encontrado" });
      }
    } catch (error) {
      const err = new createError[500]();
      return next(err);
    }
  };
};

const filtrarEntidades = (model, query) => {
  let queryResultado = lodash.cloneDeep(query);
  for (let llave of Object.keys(queryResultado)) {
    const instancia = lodash.get(model, `schema.paths.${llave}.instance`, null);
    if (instancia === null) {
      queryResultado[llave] = undefined;
      continue;
    }
    if (
      instancia === "ObjectID" ||
      instancia === "Date" ||
      instancia === "Number"
    ) {
      continue;
    }
    queryResultado[llave] = { $regex: query[llave], $options: "i" };
  }
  return queryResultado;
};

const existeDocumento = function closureExisteDocumento({
  Modelo = null,
  campos = [],
}) {
  return async function closureHandlerExisteDocumento(req, res, next) {
    try {
      if (!Modelo) {
        throw new Error("No se envió modelo");
      }
      if (req.body && Array.isArray(campos) && campos.length) {
        const queryExiste = campos.reduce((acumulador, propiedadActual)  =>  {
          if(typeof propiedadActual === "string") {
            if(propiedadActual === "_id") {
              acumulador = {...acumulador, [propiedadActual]: req.params[propiedadActual]}
            } else {
              acumulador = {...acumulador, [propiedadActual]: req.body[propiedadActual]}
            }
          }
          if(typeof propiedadActual === "object" && !Array.isArray(propiedadActual)) {
            const {operador = null, nombre = null} = propiedadActual;
            if(operador && nombre) {
              if(nombre === "_id") {
                acumulador = {...acumulador, [nombre]: {[operador]: req.params[nombre]}}
              } else {
                acumulador = {...acumulador, [nombre]: {[operador]: req.body[nombre]}}
              }
            }
          }
          return acumulador;
        }, {});

        console.log({queryExiste});

        const existenEntidadesConElMismoDocumento = await Modelo.exists(queryExiste);
        if (existenEntidadesConElMismoDocumento) {
          return res.status(400).json({
            mensaje: `entidad ${JSON.stringify(req.body)} tiene campos que no permiten duplicación!`,
          });
        }
      }
      return next();
    } catch (error) {
      const err = new createError[500]();
      return next(err);
    }
  };
};

module.exports = {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
  filtrarEntidades,
  existeDocumento,
};
