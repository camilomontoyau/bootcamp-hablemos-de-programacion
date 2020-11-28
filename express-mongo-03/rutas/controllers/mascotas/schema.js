const mongoose = require("mongoose");
const { Schema } = mongoose;

const mascotaSchema = new Schema(
  {
    tipo: String,
    nombre: {
      type: String,
      required: true,
    },
    dueno: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mascotas", mascotaSchema);
