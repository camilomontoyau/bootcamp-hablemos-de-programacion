const router = require("express").Router();
const Mascota = require("./schema");
const Dueno = require("../duenos/schema");


const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
  filtrarEntidades,
} = require("../genericos");



const listarHandler = listar({ Modelo: Mascota, populate: ["dueno"] });
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Mascota });
router.get("/:_id", obtenerUnoHandler);

const crearHandler = crear({ Modelo: Mascota });
router.post("/", async (req, res) => {
  const { dueno = null } = req.body;
  const existeDueno = await Dueno.exists({ _id: dueno });
  if (existeDueno) {
    return crearHandler(req, res);
  }
  return res.status(400).json({
    mensaje: `Dueno con _id ${dueno} no existe!`,
  });
});

const editarHandler = actualizar({ Modelo: Mascota });
router.put("/:_id", editarHandler);

const eliminarHandler = eliminar({ Modelo: Mascota });
router.delete("/:_id", eliminarHandler);

module.exports = router;
