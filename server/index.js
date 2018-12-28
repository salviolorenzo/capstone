const db = require('./models/db');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const TwitterStrategy = require('passport-twitter');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./models/User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'sdfhgdfhgfhfgdhgf',
    resave: true,
    saveUninitialized: true
  })
);

// function checkLoginState() {
//   FB.getLoginStatus(response => {
//     statusChangeCallback(response);
//   });
// }
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
      User.findOrCreate({ twitterId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get('/', (req, res) => {
  res.send('ROOT');
});

app.get('/login', (req, res) => {
  res.send('LOGIN');
});

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

// {
//   status: 'connected',
//   authResponse: {
//       accessToken: '...',
//       expiresIn:'...',
//       signedRequest:'...',
//       userID:'...'
//   }
// }

{
  /* <fb:login-button 
  scope="public_profile,email"
  onlogin="checkLoginState();">
</fb:login-button> */
}

app.listen(4000, () => {
  console.log('Listening on 4000...');
});
