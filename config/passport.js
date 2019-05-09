const passport = require('passport');
const { Strategy } = require('passport-facebook');

// passport.use(new FacebookStrategy(
//   {
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_SECRET,
//     callbackURL: process.env.CALLBACK_URL,
//     profileFields: ['displayName', 'email']
//   },
//   (accessToken, refreshToken, profile, cb) => {
//     console.log(accessToken, refreshToken, profile, "STRAT")
//   }
// ))