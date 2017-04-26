const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./config/auth');

const app = express();

passport.use(new GoogleStrategy({
    clientId: configAuth.googleAuth.clientId,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
  }, (token, tokenSecret, profile, done) => {
    console.log({ token, tokenSecret, profile });
    done();
  }
));

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('Auth redirect to root taking place');
    res.redirect('/');
  }
);

app.get('/login', (req, res) => {
  console.log('Rendering login screen');
  res.render('views/login.html');
});

app.get('/', (req, res) => {
  console.log('Rendering home screen');
  res.render('views/index.html');
});

app.listen(4200, () => {
  console.log('Test app is listening on port 4200');
});
