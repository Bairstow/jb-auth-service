const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./auth');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,
    }, (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        console.log(`Profile ID: ${profile.id}`);
        console.log(`Access token: ${accessToken}`);
        console.log(`Refresh token: ${refreshToken}`);
        return done(null, {});
      })
    }
  ));
};
