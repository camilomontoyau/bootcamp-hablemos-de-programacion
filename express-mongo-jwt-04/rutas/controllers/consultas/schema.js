const mongoose = require("mongoose");
const { Schema } = mongoose;

const notaSchema = new Schema(
  {
    mensaje: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const consultaSchema = new Schema(
  {
    mascota: { type: "ObjectId", ref: "mascotas" },
    veterinaria: { type: "ObjectId", ref: "usuarios" },
    historia: {
      type: String,
      required: true,
    },
    diagnostico: {
      type: String,
      required: true,
    },
    nota: [notaSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("consultas", consultaSchema);
