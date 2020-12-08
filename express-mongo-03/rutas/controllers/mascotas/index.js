const router = require("express").Router();
const Mascota = require("./schema");


const {
  listar,
  obtenerUno,
  /* crear, */
  actualizar,
  eliminar,
  filtrarEntidades,
} = require("../genericos");
const { query } = require("express");

const entidad = "mascotas";

const listarHandler = listar({ Modelo: Mascota, populate: ["dueno"] });
router.get("/", listarHandler);

//const obtenerUnoHandler = obtenerUno(entidad);
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const mascota = await Mascota.findById(_id);
    if (mascota) {
      return res.status(200).json(mascota);
    }
    return res.status(404).json({ mensaje: "recurso no encontrado" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ mensaje: error.message });
  }
});

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

//const editarHandler = actualizar(entidad);

router.put("/:_id", async (req, res) => {
  try {
    const { _id = null } = req.params;
    const {_id: id, ...datosNuevos } = req.body;
    if(!_id) {
      return res.status(400).json({ mensaje: 'falta id' });  
    } 
    const mascotaActualizada = await Mascota.findOneAndUpdate({_id}, {$set : datosNuevos}, {new:true, runValidators:true});
    return res.status(200).json(mascotaActualizada);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ mensaje: error.message });
  }
});

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
