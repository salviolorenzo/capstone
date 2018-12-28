const db = require('./models/db');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const TwitterStrategy = require('passport-twitter');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github');
const LinkedinStrategy = require('passport-linkedin');
const RedditStrategy = require('passport-reddit');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SoundcloudStrategy = require('passport-soundcloud');
const AmazonStrategy = require('passport-amazon');

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

// PASSPORT.USE ===============================
passport.use(
  new FacebookStrategy(
    {
      clientID: `2208092972608586`,
      clientSecret: `0909e2504dc3a4c16d539f01c1431e53`,
      callbackURL: 'http://localhost:4000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(
        `===========${accessToken},=========== ${refreshToken},=========== ${profile},=========== ${cb}`
      );
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: `HmNmPkPiHQG6RkbsZDYzYbPSU`,
      consumerSecret: `0IZLQWkZ6so7PpYzmjXskZG6pT64Ehc0WffRwTlyOwAQP5vXfq`,
      callbackURL: 'http://localhost:4000/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, cb) {
      console.log(profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: `GOOGLE_CLIENT_ID`,
      clientSecret: `GOOGLE_CLIENT_SECRET`,
      callbackURL: 'http://localhost:4000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile, accessToken);
    }
  )
);

passport.use(
  new LinkedinStrategy(
    {
      consumerKey: `LINKEDIN_API_KEY`,
      consumerSecret: `LINKEDIN_SECRET_KEY`,
      callbackURL: 'http://localhost:4000/auth/linkedin/callback'
    },
    function(token, tokenSecret, profile, done) {
      console.log(token, profile);
    }
  )
);

passport.use(
  new RedditStrategy(
    {
      clientID: `REDDIT_CONSUMER_KEY`,
      clientSecret: `REDDIT_CONSUMER_SECRET`,
      callbackURL: 'http://localhost:4000/auth/reddit/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken, profile);
    }
  )
);

passport.use(
  new SpotifyStrategy(
    {
      clientID: `client_id`,
      clientSecret: `client_secret`,
      callbackURL: 'http://localhost:4000/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log(accessToken, profile);
    }
  )
);

passport.use(
  new AmazonStrategy(
    {
      clientID: `AMAZON_CLIENT_ID`,
      clientSecret: `AMAZON_CLIENT_SECRET`,
      callbackURL: 'http://localhost:4000/auth/amazon/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken, profile);
    }
  )
);

passport.use(
  new SoundCloudStrategy(
    {
      clientID: `SOUNDCLOUD_CLIENT_ID`,
      clientSecret: `SOUNDCLOUD_CLIENT_SECRET`,
      callbackURL: 'http://localhost:4000/auth/soundcloud/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken, profile);
    }
  )
);

// =======================================================
// STANDARD ROUTES ==========================================
// =======================================================
app.get('/', (req, res) => {
  res.send('ROOT');
});

app.get('/login', (req, res) => {
  res.send('LOGIN');
});

// =======================================================
// GOOGLE AUTH ==========================================
// =======================================================
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
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
