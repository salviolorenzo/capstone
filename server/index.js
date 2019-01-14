require('dotenv').config();

const db = require('./models/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const User = require('./models/User');
const Board = require('./models/Board');
const Tile = require('./models/Tiles');
const Events = require('./models/Events');
const Preferences = require('./models/Preferences');
const fetch = require('node-fetch');

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

app.use(express.static('public')); // all static files will be served from public folder

// =======================================================
// STANDARD ROUTES ==========================================
// =======================================================
app.get('/', (req, res) => {
  res.redirect('/');
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
      res.send(doesMatch);
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
      // Board.addBoard('Board 1', true, req.session.user.id);
      // Board.addBoard('Board 2', true, req.session.user.id);
      // Board.addBoard('Board 3', true, req.session.user.id);
      res.send(result);
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

app.get('/home/settings/preferences', (req, res) => {
  Preferences.getPref(req.session.user.id).then(result => {
    res.send(result);
  });
});

app.post('/home/settings/preferences', (req, res) => {
  Preferences.addPref(
    req.session.user.id,
    req.body.id,
    req.body.value,
    req.body.type
  ).then(result => {
    res.send(result);
  });
});

app.post('/home/settings/preferences/:id', (req, res) => {
  Preferences.removePref(req.params.id).then(
    res.redirect('/home/settings/preferences')
  );
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

app.listen(4000, () => {
  console.log('Listening on 4000...');
});
