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
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ["dueno", "veterinaria", "administrador"],
      /* 
        - administrador:  puede loguearse
                          puede hacer cualquier cosa en la API OK
        - veterinaria:    puede loguearse OK
                          puede crear, editar, eliminar, leer mascotas OK
                          puede crear OK, editar OK, eliminar OK, leer OK duenos
                          puede crear OK, leer OK, crear notas aclaratorias consultas
        - dueno:          puede loguearse
                          puede listar consultas OK, puede leer una sola que sea de una mascota propia OK, solo de sus propias mascotas
                          puede listar sus mascotas OK, leer una sola mascota que se propia OK y editar sus propias mascotas OK
      */
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (mail) => {
          if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
              mail
            )
          ) {
            return true;
          }
          return false;
        },
        message: "El formato del email es errado",
      },
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("usuarios", usuarioSchema);
