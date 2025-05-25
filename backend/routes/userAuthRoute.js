const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
router.use(express.static('../frontend'));
const session = require('express-session');
const mongoose = require("mongoose"); 

const { signIn } = require('../controllers/userAuthController');
const { register } = require('../controllers/userAuthController');
router.post('/sign-in', signIn);
router.post('/register',register);
module.exports = router;
