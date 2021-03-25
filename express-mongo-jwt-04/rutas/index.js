const passport = require("passport");
const _get = require("lodash/get");
const FacebookStrategy = require("passport-facebook");
const mascotas = require("./controllers/mascotas");
const consultas = require("./controllers/consultas");
const usuarios = require("./controllers/usuarios");
const Usuario = require("./controllers/usuarios/schema");
const login = require("./controllers/login");
const { estaAutenticado, jwtSignPromise } = require("./../util");
const { middlewareEstaAutorizado } = require("./controllers/genericos");
const {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_URL, SECRET_KEY} = process.env;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
      profileFields: [
        //"id",
        //"displayName",
        "first_name",
        "last_name",
        //"photos",
        "email",
      ],
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        const email = _get(profile, "_json.email", null);
        const nombre = _get(profile, "_json.first_name", null);
        const apellido = _get(profile, "_json.last_name", null);
        const id = _get(profile, "_json.id", null);
        let usuario = await Usuario.findOne({ email, tipo: "dueno" });
        if(!usuario || !usuario._id) {
          usuario = new Usuario({
            email, 
            nombre, 
            apellido, 
            tipo: "dueno", 
            documento: id ? `fb_${id}`: '' 
          });
          await usuario.save();
        }
        usuario = usuario.toJSON();
        const { password, ...datosUsuario } = usuario;
        const token = await jwtSignPromise({
          data: datosUsuario,
          secret: SECRET_KEY,
          options: {  expiresIn: 60 * 60  },
        });
        const respuesta = { token, usuario: datosUsuario };
        return cb(false, respuesta);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

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
