const passport = require("./passport-config");
const mascotas = require("./controllers/mascotas");
const consultas = require("./controllers/consultas");
const usuarios = require("./controllers/usuarios");
const login = require("./controllers/login");
const {
  middlewareEstaAutorizado,
  estaAutenticado,
} = require("./controllers/genericos");

module.exports = (app) => {
  app.use("/login", login);
  app.use(passport.initialize());
  app.use(passport.session());
  app.get("/auth/facebook", passport.authenticate("facebook"));
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      // successRedirect: "/existoso",
      failureRedirect: "/fallo",
      session: false,
    }),
    function (req, res) {
      return res.status(200).json(req.user);
    }
  );
  app.use(estaAutenticado);
  app.use("/mascotas", mascotas);
  app.use("/consultas", consultas);
  app.use(
    "/usuarios",
    middlewareEstaAutorizado({
      tiposUsuario: ["administrador", "veterinaria"],
    }),
    usuarios
  );
};
