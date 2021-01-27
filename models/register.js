'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegisterSchema = Schema({
    name: String,
    lastName: String,
    email: String,
    role: String,
    password: String,
    confirmPassword: String
});

module.exports = mongoose.model('Register', RegisterSchema);