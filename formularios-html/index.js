const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all("/", (req, res) => {
  let respuesta = {};

  respuesta.body = req.body;
  respuesta.params = req.params;
  respuesta.query = req.query;
  respuesta.headers = req.headers;

  console.log({ respuesta });

  res.status(200).json(respuesta);
});

app.listen(3000, () => {
  console.log("app corriendo en el puerto 3000");
});
