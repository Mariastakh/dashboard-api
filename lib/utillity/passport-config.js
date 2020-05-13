const LocalStrategy = require("passport-local").Strategy;

function initiliase(passport) {
  const authenticateUser = (username, password, done) => {
    const user = getUserByUsername(username);
    if (user == null) {
      return done(null, false, { message: "no user with that username" });
    }
  };

  
  passport.use(
    new LocalStrategy({ usernameField: username }),
    authenticateUser
  );
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}
