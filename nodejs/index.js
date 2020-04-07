const http = require('http');
const url = require('url');

const callbackDelServidor = (req, res) => {
  // 1. obtener url desde el objeto request // OK
  const urlActual = req.url;
  const urlParseada = url.parse(urlActual, true);
  
  // 2. obtener la ruta
  const ruta = urlParseada.pathname;
  
  // 3. enviar una respuesta dependiendo de la ruta
  if(ruta === '/ruta') {
    res.end('hola estas en /ruta');
  } else {
    res.end('estas en una ruta que no conozco')
  }
};

const server = http.createServer(callbackDelServidor);

server.listen(5000, ()=>{
  console.log('el servidor está escuchando peticione en http://localhost:5000/');
});