const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Trip = require('../models/Trip');
var moment = require('moment');


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));


async function retrieveTrip(cityName){
  const docs = await Trip.find({ driver_id: cityName}).sort({trip_date:1});
  return docs;
}


// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
  retrieveTrip(req.user._id).then( result => 
    res.render('dashboard',{user: req.user, shit:result }) 
)
);



router.get('/trip_added_success', forwardAuthenticated, (req, res) => res.render('trip_added_success'));

// Register
router.post('/dashboard/addtrip', (req, res) => {
  const trip_date = moment(req.body.trip_date).format('dddd, MMMM Do YYYY');
  const arrival_city = req.body.arrival_city;
  const departure_city = req.body.departure_city;
  const driver_id = req.body.driver_id;

  let errors = [];

  if (!trip_date || !arrival_city || !departure_city) {
    errors.push({ msg: 'Please enter all fields' });
  }


  if (errors.length > 0) {
    res.render('register', {
      trip_date,
      arrival_city,
      departure_city,
      driver_id
    });
  } else {
          const newTrip = new Trip({
          departure_city,
          arrival_city,
          trip_date,
          driver_id
        });
        newTrip
          .save()
          .then(
            res.redirect('/dashboard'))
          


        }

});

//router.get('/trip_added_success', forwardAuthenticated, (req, res) => res.render('trip_added_success'));







module.exports = router;