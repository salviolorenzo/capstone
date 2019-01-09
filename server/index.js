require('dotenv').config();

const db = require('./models/db');
const passport = require('passport');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const User = require('./models/User');
const Board = require('./models/Board');
const Tile = require('./models/Tiles');
const Events = require('./models/Events');
const fetch = require('node-fetch');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// APP.USE ===============================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    store: new pgSession({
      pgPromise: db
    }),
    secret: 'sdfhgdfhgfhfgdhgf',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  })
);

app.use((req, res, next) => {
  let isLoggedIn = req.session.user ? true : false;
  next();
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOCLIENT,
      clientSecret: process.env.GOSECRET,
      callbackURL: 'http://localhost:4000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(accessToken, refreshToken, profile);
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

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
    console.log(user);
    req.session.user = user;
    let doesMatch = user.checkPassword(req.body.password);
    if (doesMatch) {
      res.redirect('/home/dash1');
    } else {
      res.redirect('/');
    }
  });
});

app.post('/register', (req, res) => {
  User.addUser(req.body.name, req.body.email, req.body.password).then(
    result => {
      console.log(result);
      req.session.user = result;
      Board.addBoard('Board 1', true, req.session.user.id);
      Board.addBoard('Board 2', true, req.session.user.id);
      Board.addBoard('Board 3', true, req.session.user.id);
      res.redirect('/home/dash1');
    }
  );
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/home', (req, res) => {
  // Board.getDefaultBoard(req.session.user.id).then(result => {
  //   Tile.getByBoard(result[0].id).then(tiles => {
  //     res.send(tiles);
  //   });
  // });
  Events.getAll(req.session.user.id).then(result => {
    res.send(result);
  });
});

app.get('/home/settings', (req, res) => {
  User.getUserById(req.session.user.id).then(result => res.send(result));
});

app.post('/home/settings/info', (req, res) => {
  User.getUserById(req.session.user.id)
    .then(user => {
      let didMatch = user.checkPassword(req.body.password);
      if (didMatch) {
        if (req.body.name !== user.name && req.body.name !== '') {
          user.updateName(req.body.name);
        }
        if (req.body.email !== user.email && req.body.email !== '') {
          user.updateEmail(req.body.email);
        }
        if (req.body.newPass && req.body.newPass !== '') {
          user.updatePass(req.body.newPass);
        }
      }
    })
    .then(res.redirect('/home/settings'));
});

app.get('/home/preferences', (req, res) => {});

app.post('/home/events/new', (req, res) => {
  console.log('THIS IS THE FIRST LINE =========');
  let all_day = req.body.allDay ? true : false;
  let title = req.body.title;

  Events.addEvent(
    title,
    all_day,
    req.body.start,
    req.body.end,
    req.body.description,
    req.session.user.id
  ).then(result => {
    console.log(`this is the result ${result}`);
    res.send(result);
  });
});

app.post('/home/events/:id/edit', (req, res) => {
  Events.editEvent(
    req.body.title,
    req.body.allDay,
    req.body.description,
    req.session.user.id
  ).then(res.redirect('/home'));
});

app.post('/home/events/:id/delete', (req, res) => {
  Events.deleteEvent(req.params.id).then(result => {
    console.log(result);
    res.redirect('/home');
  });
});

// app.get('/home/:id', (req, res) => {
//   Board.getById(req.params.id).then(result => {
//     Tile.getByBoard(result.id).then(next => {
//       res.send(next);
//     });
//   });
// });

// ======================================================
// API CALLS
// ======================================================

// GOOGLE AUTH
// app.get('/auth/google', passport.authenticate('google'));

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('/home');
//   }
// );

// =======================================================
// GITHUB AUTH ==========================================
// =======================================================
// app.get('/auth/github', passport.authenticate('github'));

// app.get(
//   '/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );

// =======================================================
app.listen(4000, () => {
  console.log('Listening on 4000...');
});
