const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Weather = require('../models/weather.model');

// Load environment variables
dotenv.config();

// Sample weather data
const weatherData = [
    { city: 'London', country: 'UK', temperature: 18, humidity: 75, condition: 'Cloudy' },
    { city: 'Paris', country: 'France', temperature: 22, humidity: 65, condition: 'Sunny' },
    { city: 'New York', country: 'USA', temperature: 25, humidity: 70, condition: 'Partly Cloudy' },
    { city: 'Tokyo', country: 'Japan', temperature: 28, humidity: 80, condition: 'Rainy' },
    { city: 'Sydney', country: 'Australia', temperature: 24, humidity: 60, condition: 'Clear' },
    { city: 'Dubai', country: 'UAE', temperature: 38, humidity: 45, condition: 'Sunny' },
    { city: 'Moscow', country: 'Russia', temperature: 15, humidity: 72, condition: 'Overcast' },
    { city: 'Berlin', country: 'Germany', temperature: 20, humidity: 68, condition: 'Partly Cloudy' },
    { city: 'Rome', country: 'Italy', temperature: 26, humidity: 63, condition: 'Sunny' },
    { city: 'Madrid', country: 'Spain', temperature: 29, humidity: 55, condition: 'Clear' },
    { city: 'Amsterdam', country: 'Netherlands', temperature: 19, humidity: 78, condition: 'Drizzle' },
    { city: 'Singapore', country: 'Singapore', temperature: 31, humidity: 85, condition: 'Thunderstorm' },
    { city: 'Mumbai', country: 'India', temperature: 32, humidity: 83, condition: 'Humid' },
    { city: 'Cairo', country: 'Egypt', temperature: 35, humidity: 40, condition: 'Clear' },
    { city: 'Toronto', country: 'Canada', temperature: 21, humidity: 65, condition: 'Cloudy' },
    { city: 'Seoul', country: 'South Korea', temperature: 27, humidity: 70, condition: 'Sunny' },
    { city: 'Stockholm', country: 'Sweden', temperature: 16, humidity: 73, condition: 'Light Rain' },
    { city: 'Oslo', country: 'Norway', temperature: 14, humidity: 75, condition: 'Cloudy' },
    { city: 'Vienna', country: 'Austria', temperature: 23, humidity: 62, condition: 'Clear' },
    { city: 'Lisbon', country: 'Portugal', temperature: 27, humidity: 58, condition: 'Sunny' }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Check if data already exists
        const count = await Weather.countDocuments();
        if (count > 0) {
            console.log('Database already has data. Skipping seed operation.');
            process.exit(0);
        }

        // Insert the weather data
        await Weather.insertMany(weatherData);
        console.log('Successfully added 20 weather records to the database!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeding function
seedDatabase();
