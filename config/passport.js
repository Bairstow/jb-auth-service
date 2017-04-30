const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./auth');
const UNAUTHORISED_USER_MESSAGE = 'Unsuccessful. Not the admin user.';
const checkAdminId = (id) => {
  return id === configAuth.adminAuth.id;
};

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    const isAdmin = checkAdminId(id);
    if (isAdmin) {
      done(null, {
        id: id,
        displayName: configAuth.adminAuth.displayName
      });
    } else {
      done(UNAUTHORISED_USER_MESSAGE);
    }
  });
  passport.use(new GoogleStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,
    }, (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        const isAdmin = checkAdminId(Number(profile.id));
        if (isAdmin) {
          return done(null, {
            id: profile.id,
            token: accessToken,
            name: profile.displayName,
          });
        } else {
          return done(UNAUTHORISED_USER_MESSAGE);
        }
      })
    }
  ));
};
