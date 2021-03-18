const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const mascotas = require("./controllers/mascotas");
const consultas = require("./controllers/consultas");
const usuarios = require("./controllers/usuarios");
const login = require("./controllers/login");
const { estaAutenticado } = require("./../util");
const { middlewareEstaAutorizado } = require("./controllers/genericos");
const {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_URL} = process.env;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("callback del passport.use");
      console.log({ accessToken, refreshToken, profile });
      return cb(false, {
        firstName: "Camilo",
        lastName: "Montoya",
        email: "camilomontoya2@gmail.com",
      });
      /* User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      }); */
    }
  )
);

module.exports = (app) => {
  app.use("/login", login);
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      console.log("autenticacióon FB exitosa");
      console.log(req);
      // Successful authentication, redirect home.
      res.redirect('/');
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
