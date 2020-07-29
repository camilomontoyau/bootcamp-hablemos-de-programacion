const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const _get = require("lodash.get");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.all("/", (req, res) => {
  let respuesta = {};

  respuesta.body = req.body;
  respuesta.params = req.params;
  respuesta.query = req.query;
  respuesta.headers = req.headers;
  respuesta.files = req.files;
  respuesta.file = req.file;
  respuesta.ip = req.ip || req.ips;

  console.log({ respuesta });

  const archivo = _get(req, "files.archivo", null);

  if (!!archivo) {
    archivo.mv(`./files/${archivo.name}`, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json(respuesta);
    });
  } else {
    res.status(200).json(respuesta);
  }
});

app.listen(3000, () => {
  console.log("app corriendo en el puerto 3000");
});
