const mongoose = require("mongoose");
const { Schema } = mongoose;
const Mascota = require("../mascotas/schema");
const mascotaSchema = Mascota.schema;

const notaSchema = new Schema(
  {
    mensaje: { type: String, required: true },
    veterinaria: { type: "ObjectId", ref: "usuarios" },
  },
  {
    timestamps: true,
  }
);

const consultaSchema = new Schema(
  {
    mascota: mascotaSchema,
    veterinaria: { type: "ObjectId", ref: "usuarios" },
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
