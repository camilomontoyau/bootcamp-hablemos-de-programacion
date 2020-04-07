const http = require('http');

const callbackDelServidor = (req, res) => {
  res.end('hola mundo en un server http');
};

const server = http.createServer(callbackDelServidor);

server.listen(5000, ()=>{
  console.log('el servidor está escuchando peticione en http://localhost:5000/');
});