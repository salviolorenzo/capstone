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
const path = require('path');

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

function protectRoute(req, res, next) {
  let isLoggedIn = req.session.user ? true : false;
  if (isLoggedIn) {
    next();
  } else {
    res.redirect('/');
  }
}

// all static files will be served from public folder

// =======================================================
// STANDARD ROUTES ==========================================
// =======================================================
// app.get('/', (req, res) => {
//   res.redirect('/');
// });

app.post('/api/login', (req, res) => {
  User.getByEmail(req.body.email).then(user => {
    console.log(user);
    req.session.user = user;
    let doesMatch = user.checkPassword(req.body.password);
    res.send(doesMatch);
  });
});

app.post('/api/register', (req, res) => {
  User.addUser(req.body.name, req.body.email, req.body.password).then(
    result => {
      console.log(result);
      req.session.user = result;

      res.send(result);
    }
  );
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/api/events', (req, res) => {
  Events.getAll(req.session.user.id).then(result => {
    res.send(result);
  });
});

app.get('/api/preferences', (req, res) => {
  Preferences.getPref(req.session.user.id).then(result => {
    res.send(result);
  });
});

app.post('/api/preferences', (req, res) => {
  Preferences.addPref(
    req.session.user.id,
    req.body.id,
    req.body.value,
    req.body.type
  ).then(result => {
    res.send(result);
  });
});

app.post('/api/preferences/:id', (req, res) => {
  Preferences.removePref(req.params.id).then(result => res.send(result));
});

app.get('/api/settings', (req, res) => {
  User.getUserById(req.session.user.id).then(result => res.send(result));
});

app.post('/api/settings/info', (req, res) => {
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
    .then(result => res.send(result));
});

app.post('/api/events/new', (req, res) => {
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

app.post('/api/events/:id/edit', (req, res) => {
  Events.editEvent(
    req.body.title,
    req.body.allDay,
    req.body.description,
    req.session.user.id
  ).then(res.redirect('/home'));
});

app.post('/api/events/:id/delete', (req, res) => {
  Events.deleteEvent(req.params.id).then(result => {
    console.log(result);
    res.redirect('/home');
  });
});
app.use(express.static('public'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(4000, () => {
  console.log('Listening on 4000...');
});
