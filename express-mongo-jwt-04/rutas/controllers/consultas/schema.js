const mongoose = require("mongoose");
const { Schema } = mongoose;
const Mascota = require("../mascotas/schema");
const mascotaSchema = Mascota.schema;
const Veterinaria = require("../usuarios/schema");
const veterinariaSchema = Veterinaria.schema;

const notaSchema = new Schema(
  {
    mensaje: { type: String, required: true },
    veterinaria: veterinariaSchema,
  },
  {
    timestamps: true,
  }
);

const consultaSchema = new Schema(
  {
    mascota: mascotaSchema,
    veterinaria: veterinariaSchema,
    historia: {
      type: String,
      required: true,
    },
    diagnostico: {
      type: String,
      required: true,
    },
    notas: [notaSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("consultas", consultaSchema);
