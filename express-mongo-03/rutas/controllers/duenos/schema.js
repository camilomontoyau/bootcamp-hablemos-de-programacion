const mongoose = require("mongoose");
const { Schema } = mongoose;

const duenoSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("duenos", duenoSchema);
