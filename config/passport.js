const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./auth');

module.exports = function(passport) {
  console.log('Setting auth config:');
  console.log({ clientId: configAuth.googleAuth.clientId, clientSecret: configAuth.googleAuth.clientSecret });
  passport.use(new GoogleStrategy({
      clientId: configAuth.googleAuth.clientId,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,
    }, (token, tokenSecret, profile, done) => {
      console.log({ token, tokenSecret, profile });
      done();
    }
  ));
};
