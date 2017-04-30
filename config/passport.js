const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./auth');
const UNAUTHORISED_USER_MESSAGE = 'Unsuccessful. Not the admin user.';
const checkAdminId = (id) => {
  const isAdminId = id === configAuth.adminAuth.id;
  console.log(`Checked id is Admin: ${isAdminId}`);
  return isAdminId;
};

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    console.log('Serializing user');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log(`Deserializing with id: ${id}`);
    const isAdmin = checkAdminId(Number(id));
    if (isAdmin) {
      done(null, {
        id: configAuth.adminAuth.id,
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
          console.log('Successfully found Admin user.');
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
