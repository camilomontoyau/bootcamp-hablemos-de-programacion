const url = require("url");
const path = require("path");
const StringDecoder = require("string_decoder").StringDecoder;
const enrutador = require("./enrutador");
const { numeroAleatorio } = require("./util");


module.exports = (req, res) => {
  // 1. obtener url desde el objeto request // OK
  const urlActual = req.url;
  const urlParseada = url.parse(urlActual, true);

  // 2. obtener la ruta
  const ruta = urlParseada.pathname;

  // 3. quitar slash
  const rutaLimpia = ruta.replace(/^\/+|\/+$/g, "");

  // 3.1 obtener el método http
  const metodo = req.method.toLowerCase();

  //3.1.1 dar permisos de CORS escribiendo los headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, DELETE, POST"
  );
  //3.1.2 dar respuesta inmediata cuando el método sea options
  if (metodo === "options") {
    res.writeHead(204);
    res.end();
    return;
  }

  // 3.2 obtener variables del query url
  const { query = {} } = urlParseada;

  // 3.3 obtener headers
  const { headers = {} } = req;

  // 3.4 obtener payload, en el caso de haber uno
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  // 3.4.1 ir acumulando la data cuando el request reciba un payload
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  // 3.4.2 terminar de acumular datos y decirle al decoder que finalice
  req.on("end", () => {
    buffer += decoder.end();

    if (headers["content-type"] === "application/json") {
      buffer = JSON.parse(buffer);
    }

    //3.4.3 revisar si tiene subrutas en este caso es el indice del array
    if (rutaLimpia.indexOf("/") > -1) {
      var [rutaPrincipal, indice] = rutaLimpia.split("/");
    }
    //3.5 ordenar la data del request
    let data = {
      indice,
      ruta: rutaPrincipal || rutaLimpia,
      query,
      metodo,
      headers,
      payload: buffer,
    };

    if (metodo === "post" && data.payload) {
      data.payload.id = numeroAleatorio();
    }

    if (metodo === "get" && data.ruta === "") {
      data.ruta = "index.html";
    }

    const tiposMime = {
      ".html": "text/html",
      ".json": "application/json",
      ".ico": "image/x-icon",
      ".css": "text/css",
      ".js": "text/javascript",
      ".map": "application/octet-stream",
      ".png": "image/png",
    };

    const archivos = ["index.html", "manifest.json", "favicon.ico", "static"];
    const esArchivo = archivos.includes(data.ruta);

    if (metodo === "get" && data.ruta === "static" && esArchivo) {
      data.indice = rutaLimpia;
    }

    // 3.6 elegir el manejador dependiendo de la ruta y asignarle función que el enrutador tiene
    let handler;
    if (data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]) {
      handler = enrutador[data.ruta][metodo];
    } else {
      handler = enrutador.noEncontrado;
    }
    console.log({ data, enrutador });

    // 4. ejecutar handler (manejador) para enviar la respuesta
    if (typeof handler === "function") {
      handler(data, (statusCode = 200, mensaje) => {
        if (esArchivo) {
          let rutaArchivo = path.join(__dirname, "publico", data.ruta);
          if (data.ruta === "static") {
            rutaArchivo = path.join(__dirname, "publico", data.indice);
          }
          const extensionArchivo = path.extname(rutaArchivo);
          const mimeType = tiposMime[extensionArchivo];
          console.log({ mimeType, extensionArchivo });
          res.writeHead(statusCode, {
            "Content-Type": mimeType,
          });
          return mensaje.pipe(res);
        }

        let respuesta = null;
        if (typeof mensaje === "string") {
          respuesta = mensaje;
        }
        if (typeof mensaje === "object") {
          respuesta = JSON.stringify(mensaje);
        }
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        // linea donde realmente ya estamos respondiendo a la aplicación cliente
        res.end(respuesta);
      });
    }
    // respuestas según la ruta
  });
};
