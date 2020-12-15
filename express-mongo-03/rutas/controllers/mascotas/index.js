const router = require("express").Router();
const Mascota = require("./schema");


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
router.post("/", crearHandler);

const editarHandler = actualizar({ Modelo: Mascota });
router.put("/:_id", editarHandler);

// const eliminarHandler = eliminar(entidad);
router.delete("/:_id", async (req, res) => {
  try {
    const { _id = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "falta id" });
    }
    const mascotaBorrada = await Mascota.remove({_id});
    if  (mascotaBorrada.deletedCount === 1) {
      return res.status(204).send();
    }
    return res
      .status(500)
      .json({ mensaje: "no se pudo eliminar el recurso, vuelva a intentar" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;
