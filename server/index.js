require('dotenv').config();

const db = require('./models/db');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const LinkedinStrategy = require('passport-linkedin').Strategy;
const RedditStrategy = require('passport-reddit').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const SoundcloudStrategy = require('passport-soundcloud').Strategy;
const AmazonStrategy = require('passport-amazon').Strategy;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./models/User');

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
  //get all user data that will then be routed with react-router
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
// GOOGLE AUTH ==========================================
// =======================================================
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/gmail.readonly']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
// =======================================================
// LINKEDIN AUTH ==========================================
// =======================================================
app.get('/auth/linkedin', passport.authenticate('linkedin'));

app.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
// =======================================================
// REDDIT AUTH ==========================================
// =======================================================
app.get('/auth/reddit', passport.authenticate('reddit'));

app.get(
  '/auth/reddit/callback',
  passport.authenticate('reddit', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
// =======================================================
// SPOTIFY AUTH ==========================================
// =======================================================
app.get('/auth/spotify', passport.authenticate('spotify'));

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
// =======================================================
// AMAZON AUTH ==========================================
// =======================================================
app.get('/auth/amazon', passport.authenticate('amazon'));

app.get(
  '/auth/amazon/callback',
  passport.authenticate('amazon', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
// =======================================================
// SOUNDCLOUD AUTH ==========================================
// =======================================================
app.get('/auth/soundcloud', passport.authenticate('soundcloud'));

app.get(
  '/auth/soundcloud/callback',
  passport.authenticate('soundcloud', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
// =======================================================
// TWITTER AUTH ==========================================
// =======================================================
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
// =======================================================
// FACEBOOK AUTH ==========================================
// =======================================================
app.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['publish_pages', 'email']
  })
);

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
// =======================================================
app.listen(4000, () => {
  console.log('Listening on 4000...');
});
