const mongoose = require("mongoose");

const conexion = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("conexión a DB con éxito");
  } catch (error) {
    console.log("error al conectars con la DB");
    console.log(error);
  }
};

module.exports = conexion;
