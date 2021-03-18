require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const conexion = require("./db");
conexion();
const rutas = require("./rutas");
const app = express();
const port = 5000;
const SECRET_KEY = process.env.SECRET_KEY;

//acá va la config cookie parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
//acá va la config de express-session
app.use(expressSession({
  secret: SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));

rutas(app);

app.listen(port, () => {
  console.log(`API veterinaria está escuchando en http://localhost:${port}`);
});
