const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Create indexes for better search performance
weatherSchema.index({ city: 1, country: 1 });
weatherSchema.index({ date: 1 });
weatherSchema.index({ temperature: 1 });

module.exports = mongoose.model('Weather', weatherSchema);
