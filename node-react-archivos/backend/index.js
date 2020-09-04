const http = require("http");
const requestHandler = require("./request-handler");
const server = http.createServer(requestHandler);
const puerto = 5000;

server.listen(puerto, () => {
  console.log(
    `el servidor está escuchando peticiones en http://localhost:${puerto}/`
  );
});
