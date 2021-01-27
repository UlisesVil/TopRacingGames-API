'use strict'

var Register = require('../models/register');
const {restart} = require('nodemon');



var controller = {

    saveRegister: function(req, res){
        var register = new Register();

        var params = req.body;
        register.name = params.name;
        register.lastName = params.lastName;
        register.email = params.email;
        register.role = params.role;
        register.password = params.password;
        register.confirmPassword = params.confirmPassword;

        register.save((err,registerStored)=>{
            if(err) return res.status(500).send({message: 'Error al guardar Registro'});

            if(!registerStored) return res.status(404).send({message: 'No se ha podido guardar el Registro'});
        
            return res.status(200).send({register: registerStored});
        });

    } 




};


module.exports = controller;