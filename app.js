const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const port = parseInt(process.env.PORT, 10) || 9000;
const db = require('./models/index');
const routes = require('./routes/');
const errorBody = require('./utils/errorStructure');



// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers","Content-Type,X-Amz-Date,Authorization,X-Api-Key,Origin,Accept,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin");
  next();
});

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
// app.route('/customers/facebook')
//   .get(passport.authenticate('facebook', { scope: ['email', 'displayName'] }));

// app.route('/auth/facebook/callback')
//   .get(passport.authenticate('facebook', (err, user, info) => {
//     if (!err) {
//       console.log(user, info, "CALLBACK");
//     }
//   }))

// version routes.
app.use('/api/v1', routes);
app.use(express.static(__dirname + "/public/index.html"));

//  catch all 500 error
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500)
    .send({ 
      error: errorBody(500, "USR_02", "An error occured", "Server")
    })
});


db.sequelize.authenticate()
  .then(() => {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`App listening on ${port}`);
    });
  })
  .catch(err => console.error("Unable to connect to database", err));

// db.sequelize.sync().then(() => {
//   console.log('Connected to database!!');
//   app.listen(port, () => {
//     console.log(`App listening on ${port}`);
//   });
// })

module.exports = app;
