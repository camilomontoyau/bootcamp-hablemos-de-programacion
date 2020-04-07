const http = require('http');

const callbackDelServidor = (req, res) => {
  // 1. obtener url desde el objeto request
  // 2. obtener la ruta
  // 3. enviar una respuesta dependiendo de la ruta
  res.end('hola mundo en un server http');
};

const server = http.createServer(callbackDelServidor);

server.listen(5000, ()=>{
  console.log('el servidor está escuchando peticione en http://localhost:5000/');
});