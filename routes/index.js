const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Trip = require('../models/Trip');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/trip_added_success', forwardAuthenticated, (req, res) => res.render('trip_added_success'));

// Register
router.post('/dashboard/addtrip', (req, res) => {
  const trip_date = req.body.trip_date;
  const arrival_city = req.body.arrival_city
  const departure_city = req.body.departure_city;

  let errors = [];

  if (!trip_date || !arrival_city || !departure_city) {
    errors.push({ msg: 'Please enter all fields' });
  }


  if (errors.length > 0) {
    res.render('register', {
      trip_date,
      arrival_city,
      departure_city
    });
  } else {
          const newTrip = new Trip({
          trip_date,
          arrival_city,
          departure_city
        });
        newTrip
          .save()
          .then(
            res.redirect('/dashboard'))
          


        }

});

//router.get('/trip_added_success', forwardAuthenticated, (req, res) => res.render('trip_added_success'));







module.exports = router;