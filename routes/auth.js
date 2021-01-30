'use strict'

var express = require('express');
var RegisterController= require('../controllers/register');
var AuthController= require('../controllers/authController');

var router = express.Router();

router.post('/save-register', RegisterController.saveRegister);
router.post('/login', AuthController.login);

module.exports = router;