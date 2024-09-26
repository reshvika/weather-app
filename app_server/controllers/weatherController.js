const axios = require('axios');

const getWeather = async (req, res) => {
  try {
    const city = req.query.city || 'New York';  // Default city if none is specified
    const apiKey = 'a974877ab53124d762447e65bb275dee';  // Replace with your weather API key
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // Extract temperature, humidity, and other information
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const weatherDescription = weatherData.weather[0].description;

    res.json({
      city: weatherData.name,
      temperature: `${temperature}°C`,
      humidity: `${humidity}%`,
      description: weatherDescription
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve weather data.' });
  }
};

module.exports = { getWeather };
