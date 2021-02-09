const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    tipo: String,
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    documento: {
      type: Number,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ["dueno", "veterinaria"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("usuarios", usuarioSchema);
