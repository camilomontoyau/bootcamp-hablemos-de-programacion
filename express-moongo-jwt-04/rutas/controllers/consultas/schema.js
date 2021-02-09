const mongoose = require("mongoose");
const { Schema } = mongoose;

const consultaSchema = new Schema(
  {
    mascota: { type: "ObjectId", ref: "mascotas" },
    veterinaria: { type: "ObjectId", ref: "veterinarias" },
    historia: {
      type: String,
      required: true,
    },
    diagnostico: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("consultas", consultaSchema);
