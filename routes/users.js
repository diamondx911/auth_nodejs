const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require ('passport');

//Load User model
const User = require('../models/User');

const { forwardAuthenticated } = require('../config/auth');

//Login page
router.get('./login', forwardAuthenticated, (req,res) => res.render('login'));

//register page

router.get('./register', forwardAuthenticated, (req,res) => res.render('register'));

module.exports = router;