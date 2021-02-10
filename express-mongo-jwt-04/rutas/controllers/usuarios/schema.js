const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
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
      enum: ["dueno", "veterinaria", "administrador"],
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (mail) => {
          if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            console.log("correcto");
            return (true);
          }
          console.log("incorrecto");
          return (false);
        },
        message: "El formato del email es errado"
      },
    },
    password: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("usuarios", usuarioSchema);
