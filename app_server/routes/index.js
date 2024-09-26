var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weatherController');

// Define a route for the weather information
router.get('/weather', weatherController.getWeather);

module.exports = router;
