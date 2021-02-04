'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var RegisterSchema = Schema({
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    role:{
        type: String,
        default: 'regular',
        enum:[
            'regular',
            'admin'
        ]
    },
    password:{
        type: String,
        required: true
    },
    sign_up_date:{
        type: Date,
        default: Date.now()
    },
    last_login_date:{
        type: Date,
        default: Date.now()
    }
});

RegisterSchema.pre('save', function(next){
    bcrypt.genSalt(10).then(salts=>{
        bcrypt.hash(this.password,salts).then(hash=>{
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});


module.exports = mongoose.model('Register', RegisterSchema);

