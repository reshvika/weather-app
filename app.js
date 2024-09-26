// Import necessary modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Create the express app
var app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Import the weather route
var weatherRouter = require('./app_server/routes/index');  // Adjust path if necessary

// Use the weather route under /api
app.use('/api', weatherRouter);  // This line adds the /api route for weather

// Route for the root URL (/)
app.get('/', function(req, res) {
  res.send('Welcome to the Weather App!');  // Customize this as needed
});

// Route for favicon
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'public', 'favicon.ico')));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Export the app for use in bin/www
module.exports = app;
