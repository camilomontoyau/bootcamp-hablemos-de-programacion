const router = require("express").Router();
const Consulta = require("./schema");


const {
  /* listar, */
  obtenerUno,
  /* crear, */
  actualizar,
  eliminar,
} = require("../genericos");

const entidad = "consultas";

//const listarHandler = listar(entidad);
router.get("/", async (req, res) => {
  try {
    const consultas = await Consulta.find()
      .populate("mascota")
      .populate("veterinaria");
    return res.status(200).json(consultas);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ mensaje: error.message });
  }
});

//const obtenerUnoHandler = obtenerUno(entidad);
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const consulta = await Consulta.findById(_id);
    if (consulta) {
      return res.status(200).json(consulta);
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
    const consulta = new Consulta(req.body);
    await consulta.save();
    return res.status(200).json(consulta);  
  } catch (error) {
    console.log({error});
    return res.status(500).json({ mensaje: error.message });
  }
});

//const editarHandler = actualizar(entidad);

router.put("/:_id", async (req, res) => {
  try {
    const { _id = null } = req.params;
    const { _id: id, ...datosNuevos } = req.body;
    if (!_id) {
      return res.status(400).json({ mensaje: "falta id" });
    }
    const consultaActualizada = await Consulta.findOneAndUpdate(
      { _id },
      { $set: datosNuevos },
      { new: true, runValidators: true }
    );
    return res.status(200).json(consultaActualizada);
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
    const resultado = await Consulta.remove({ _id });
    if  (resultado.deletedCount === 1) {
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
