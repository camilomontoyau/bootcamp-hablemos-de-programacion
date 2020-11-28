const router = require("express").Router();
const Mascota = require("./schema");


const {
  /* listar, */
  obtenerUno,
  /* crear, */
  actualizar,
  eliminar,
} = require("../genericos");

const entidad = "mascotas";

//const listarHandler = listar(entidad);
router.get("/", async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    return res.status(200).json(mascotas);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ mensaje: error.message });
  }
});

const obtenerUnoHandler = obtenerUno(entidad);
router.get("/:_id", obtenerUnoHandler);

//const crearHandler = crear(entidad);
router.post("/", async (req, res)=>{
  try {
    const mascota = new Mascota(req.body);
    await mascota.save();
    return res.status(200).json(mascota);  
  } catch (error) {
    console.log({error});
    return res.status(500).json({ mensaje: error.message });
  }
});

const editarHandler = actualizar(entidad);
router.put("/:_id", editarHandler);

const eliminarHandler = eliminar(entidad);
router.delete("/:_id", eliminarHandler);

module.exports = router;
