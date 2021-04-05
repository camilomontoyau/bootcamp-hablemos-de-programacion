const mongoose = require("mongoose");
const { Schema } = mongoose;
const Usuario = require("../usuarios/schema");
const usuarioSchema = Usuario.schema;

const mascotaSchema = new Schema(
  {
    tipo: String,
    nombre: {
      type: String,
      required: true,
    },
    dueno: usuarioSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mascotas", mascotaSchema);
