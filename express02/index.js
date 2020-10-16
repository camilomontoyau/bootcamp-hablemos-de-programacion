const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { crear } = require("./data-handler");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("La api está corriendo sin problemas!");
});

app.get("/mascotas", (req, res) => {
  const mascotas = [
    { tipo: "Perro", nombre: "Trosky0", dueno: "Camilo" },
    { tipo: "Perro", nombre: "Trosky1", dueno: "Camilo" },
    { tipo: "Perro", nombre: "Trosky2", dueno: "Camilo" },
    { tipo: "Perro", nombre: "Trosky3", dueno: "Camilo" },
    { tipo: "Perro", nombre: "Trosky4", dueno: "Camilo" },
  ];
  res.status(200).json(mascotas);
});

app.post("/mascotas", async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    const _id = uuidv4();
    const datosMascotaNueva = { ...req.body, _id }; 
    const nuevaMascota = await crear({
      directorioEntidad: "mascotas",
      nombreArchivo: _id,
      datosGuardar: datosMascotaNueva,
    });
    return res.status(200).json(nuevaMascota);
  }
  return res.status(400).json({ mensaje: "Falta el body" });
});

app.listen(port, () => {
  console.log(`API veterinaria está escuchando en http://localhost:${port}`);
});
