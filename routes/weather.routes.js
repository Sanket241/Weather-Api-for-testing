const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather.controller');

// GET all weather records with filtering, sorting, and pagination
router.get('/', weatherController.getAllWeather);

// GET weather record by ID
router.get('/:id', weatherController.getWeatherById);

// POST new weather record
router.post('/', weatherController.createWeather);

// PUT update weather record
router.put('/:id', weatherController.updateWeather);

// DELETE weather record
router.delete('/:id', weatherController.deleteWeather);

module.exports = router;
