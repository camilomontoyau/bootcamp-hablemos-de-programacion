const http = require("http");
const requestHandler = require("./request-handler");
const server = http.createServer(requestHandler);

server.listen(6000, () => {
  console.log(
    "el servidor está escuchando peticiones en http://localhost:6000/"
  );
});
