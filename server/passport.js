// PASSPORT.USE ===============================
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FB_ID,
//       clientSecret: process.env.FB_SECRET,
//       callbackURL: 'http://localhost:4000/auth/facebook/callback'
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       console.log(
//         `===========${accessToken},=========== ${refreshToken},=========== ${profile},=========== ${cb}`
//       );
//     }
//   )
// );

// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: process.env.TWIT_ID,
//       consumerSecret: process.env.TWIT_SECRET,
//       callbackURL: 'http://localhost:4000/auth/twitter/callback'
//     },
//     function(token, tokenSecret, profile, cb) {
//       console.log(profile);
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '1022100638154-gdecbbnaqj8kprp0miabkv76etjadrl6.apps.googleusercontent.com',
      clientSecret: 'Y1uYM9EZxiw19D-Blq-QSgDu',
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
  new SoundcloudStrategy(
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

passport.use(
  new GitHubStrategy(
    {
      clientID: '5e69a255e27e3d711748',
      clientSecret: '9c4699b59961d5f9f58d1fa87f870532c246d9ea',
      callbackURL: 'http://locahost:4000/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
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
