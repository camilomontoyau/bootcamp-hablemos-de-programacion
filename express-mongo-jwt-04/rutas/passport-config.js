const passport = require("passport");
const _get = require("lodash/get");
const FacebookStrategy = require("passport-facebook");
const Usuario = require("./controllers/usuarios/schema");
const { jwtSignPromise } = require("./../util");

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_CALLBACK_URL,
  SECRET_KEY,
} = process.env;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
      profileFields: ["first_name", "last_name", "email"],
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        const email = _get(profile, "_json.email", null);
        const nombre = _get(profile, "_json.first_name", null);
        const apellido = _get(profile, "_json.last_name", null);
        const id = _get(profile, "_json.id", null);
        let usuario = await Usuario.findOne({ email, tipo: "dueno" });
        if (!usuario || !usuario._id) {
          usuario = new Usuario({
            email,
            nombre,
            apellido,
            tipo: "dueno",
            documento: id ? `fb_${id}` : "",
          });
          await usuario.save();
        }
        usuario = usuario.toJSON();
        const { password, ...datosUsuario } = usuario;
        const token = await jwtSignPromise({
          data: datosUsuario,
          secret: SECRET_KEY,
          options: { expiresIn: 60 * 60 },
        });
        const respuesta = { token, usuario: datosUsuario };
        return cb(false, respuesta);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

module.exports = passport;
