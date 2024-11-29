const Weather = require('../models/weather.model');

// Get all weather records with pagination, sorting, and filtering
exports.getAllWeather = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            sortBy = 'date', 
            order = 'desc',
            city,
            country,
            minTemp,
            maxTemp,
            fromDate,
            toDate
        } = req.query;

        const query = {};
        
        // Apply filters
        if (city) query.city = new RegExp(city, 'i');
        if (country) query.country = new RegExp(country, 'i');
        if (minTemp || maxTemp) {
            query.temperature = {};
            if (minTemp) query.temperature.$gte = Number(minTemp);
            if (maxTemp) query.temperature.$lte = Number(maxTemp);
        }
        if (fromDate || toDate) {
            query.date = {};
            if (fromDate) query.date.$gte = new Date(fromDate);
            if (toDate) query.date.$lte = new Date(toDate);
        }

        const sortOptions = {};
        sortOptions[sortBy] = order === 'desc' ? -1 : 1;

        const records = await Weather.find(query)
            .sort(sortOptions)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Weather.countDocuments(query);

        res.json({
            records,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get weather record by ID
exports.getWeatherById = async (req, res) => {
    try {
        const weather = await Weather.findById(req.params.id);
        if (!weather) {
            return res.status(404).json({ message: 'Weather record not found' });
        }
        res.json(weather);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new weather record
exports.createWeather = async (req, res) => {
    try {
        const weather = new Weather(req.body);
        const newWeather = await weather.save();
        res.status(201).json(newWeather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update weather record
exports.updateWeather = async (req, res) => {
    try {
        const weather = await Weather.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!weather) {
            return res.status(404).json({ message: 'Weather record not found' });
        }
        res.json(weather);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete weather record
exports.deleteWeather = async (req, res) => {
    try {
        const weather = await Weather.findByIdAndDelete(req.params.id);
        if (!weather) {
            return res.status(404).json({ message: 'Weather record not found' });
        }
        res.json({ message: 'Weather record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
