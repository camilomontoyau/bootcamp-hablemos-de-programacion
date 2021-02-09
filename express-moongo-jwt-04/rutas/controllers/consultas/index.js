const router = require("express").Router();
const Consulta = require("./schema");
const Veterinaria = require("../veterinarias/schema");
const Mascota = require("../mascotas/schema");

const {
  listar,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
} = require("../genericos");

const listarHandler = listar({
  Modelo: Consulta,
  populate: ["mascota", "veterinaria"],
});
router.get("/", listarHandler);

const obtenerUnoHandler = obtenerUno({ Modelo: Consulta });
router.get("/:_id", obtenerUnoHandler);


const crearHandler = crear({ Modelo: Consulta });
router.post("/", async (req, res) => {
  const { mascota = null, veterinaria = null } = req.body;
  const existeVeterinaria = await Veterinaria.exists({ _id: veterinaria });
  const existeMascota = await Mascota.exists({ _id: mascota });
  if (existeVeterinaria && existeMascota) {
    return crearHandler(req, res);
  }
  if (!existeVeterinaria) {
    const err = new createError[400](
      `Veterinari@ con _id ${JSON.stringify(veterinaria)} no existe!`
    );
    return next(err);
  }
  if (!existeMascota) {
    const err = new createError[400](
      `Mascota con _id ${JSON.stringify(veterinaria)} no existe!`
    );
    return next(err);
  }
});

const editarHandler = actualizar({ Modelo: Consulta });
router.put("/:_id", editarHandler);

const eliminarHandler = eliminar({ Modelo: Consulta });
router.delete("/:_id", eliminarHandler);

module.exports = router;
