const express = require('express');
const passport = require('passport');
const passportConfig = require('./config/passport')(passport);

const app = express();
app.use(passport.initialize());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  console.log('Rendering home screen');
  res.render('index.ejs');
});

app.get('/profile', (req, res) => {
  console.log('Rendering profile screen');
  res.render('profile.ejs');
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
  })
);

app.listen(4200, () => {
  console.log('Test app is listening on port 4200');
});
