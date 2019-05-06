const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT, 10) || 9000;

// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
message: 'Welcome!',
}));

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

module.exports = app;
