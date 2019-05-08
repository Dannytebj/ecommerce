const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT, 10) || 9000;
const db = require('./models/index');
const routes = require('./routes/');

// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// version routes.
app.use('/api/v1', routes);

//  catch all 500 error
app.use((err, req, res, next) => {
  return res.status(500)
    .send({ message: 'An error occured' })
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
