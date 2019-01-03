require('dotenv').config();

const db = require('./models/db');
const passport = require('passport');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./models/User');
const Board = require('./models/Board');
const Tile = require('./models/Tiles');
const fetch = require('node-fetch');

// APP.USE ===============================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'sdfhgdfhgfhfgdhgf',
    resave: true,
    saveUninitialized: true
  })
);

// =======================================================
// STANDARD ROUTES ==========================================
// =======================================================
app.get('/', (req, res) => {
  res.send('ROOT');
});

app.get('/login', (req, res) => {
  res.send('LOGIN OR REGISTER');
});

app.post('/login', (req, res) => {
  User.getByEmail(req.body.email).then(user => {
    let doesMatch = user.checkPassord(req.body.password);
    if (doesMatch) {
      res.redirect('/home');
    } else {
      res.redirect('/login');
    }
  });
});

app.post('/register', (req, res) => {
  User.addUser(req.body.name, req.body.email, req.body.password).then(
    result => {
      console.log(result);
      res.redirect('/home');
    }
  );
});

app.get('/home', (req, res) => {
  Board.getDefaultBoard(1).then(result => {
    Tile.getByBoard(result[0].id).then(tiles => {
      res.send(tiles);
    });
  });
});

app.get('/home/:id', (req, res) => {
  Board.getById(req.params.id).then(result => {
    Tile.getByBoard(result.id).then(next => {
      res.send(next);
    });
  });
});

// =======================================================
// GITHUB AUTH ==========================================
// =======================================================
app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// =======================================================
app.listen(4000, () => {
  console.log('Listening on 4000...');
});
