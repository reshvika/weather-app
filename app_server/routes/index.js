const express = require('express');
const axios = require('axios'); // Make sure to install axios
const router = express.Router();

// Replace with your actual weather API key
const API_KEY = 'a974877ab53124d762447e65bb275dee';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

router.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.json({ error: 'City not found' });
    }
});

module.exports = router;
