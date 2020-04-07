const http = require('http');
const url = require('url');

const callbackDelServidor = (req, res) => {
  // 1. obtener url desde el objeto request // OK
  const urlActual = req.url;
  const urlParseada = url.parse(urlActual, true);
  const ruta = urlParseada.pathname;
  
  // 2. obtener la ruta
  // 3. enviar una respuesta dependiendo de la ruta
  res.end('hola mundo en un server http');
};

const server = http.createServer(callbackDelServidor);

server.listen(5000, ()=>{
  console.log('el servidor está escuchando peticione en http://localhost:5000/');
});