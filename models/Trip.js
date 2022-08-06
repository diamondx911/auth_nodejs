const mongoose = require('mongoose');
const moment = require('moment');

const TripSchema = new mongoose.Schema({
  departure_city: {
    type: String,
    required: true
  },
  arrival_city: {
    type: String,
    required: true
  },
  trip_date: {
    type: String
  },
  driver_id: {
    type: String,
  }
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;