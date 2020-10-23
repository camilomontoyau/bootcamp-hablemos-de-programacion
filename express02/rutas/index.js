const { v4: uuidv4 } = require("uuid");
const {
  crear,
  listar,
  actualizar,
  eliminar,
  obtenerUno,
} = require("../data-handler");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("La api está corriendo sin problemas!");
  });

  app.get("/:entidad", async (req, res) => {
    const { entidad = null } = req.params;
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    const mascotas = await listar({ directorioEntidad: entidad });
    res.status(200).json(mascotas);
  });

  app.get("/:entidad/:_id", async (req, res) => {
    const { _id = null, entidad = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    const mascota = await obtenerUno({
      directorioEntidad: entidad,
      nombreArchivo: _id,
    });
    if (mascota) {
      res.status(200).json(mascota);
    }
    res.status(404).json({ mensaje: "no encontrado" });
  });

  app.post("/:entidad", async (req, res) => {
    const { entidad = null } = req.params;
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    if (req.body && Object.keys(req.body).length > 0) {
      const _id = uuidv4();
      const datosMascotaNueva = { ...req.body, _id };
      const nuevaMascota = await crear({
        directorioEntidad: entidad,
        nombreArchivo: _id,
        datosGuardar: datosMascotaNueva,
      });
      return res.status(200).json(nuevaMascota);
    }
    return res.status(400).json({ mensaje: "Falta el body" });
  });

  app.put("/:entidad/:_id", async (req, res) => {
    const { _id = null, entidad = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    if (req.body && Object.keys(req.body).length > 0) {
      const datosActuales = { ...req.body, _id };
      const mascotaActualizada = await actualizar({
        directorioEntidad: entidad,
        nombreArchivo: _id,
        datosActuales,
      });
      return res.status(200).json(mascotaActualizada);
    }
    return res.status(400).json({ mensaje: "Falta el body" });
  });

  app.delete("/:entidad/:_id", async (req, res) => {
    const { _id = null, entidad = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if (!entidad) {
      res.status(404).status({ mensaje: "no encontrado" });
    }
    await eliminar({ directorioEntidad: entidad, nombreArchivo: _id });
    return res.status(204).send();
  });
};
