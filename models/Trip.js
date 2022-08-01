const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  departure_city: {
    type: String,
    required: true
  },
  arrival_city: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  driver_id: {
    type: String,
  }
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;