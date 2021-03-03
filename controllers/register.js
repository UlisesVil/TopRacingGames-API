'use strict'

var Register = require('../models/register');
//const {restart} = require('nodemon');



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

    },

    
};

module.exports = controller;




/*    //Codigo de comprobacion de correo existente para saveRegister solucionado con propiadad "unique en email del Modelo en API"
        var register2 = new Register();
        register2.email = params.email;
        var register2Email= register.email;
        const query={email: register2Email};

        if(register2Email==null) return res.status(404).send({message:'El registro no Existe'});

        Register.findOne(query, (err, register2)=>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!register2){
                register.save((err,registerStored)=>{
                    if(err) return res.status(500).send({message: 'Error al guardar Registro'});
                });
                return res.status(200).send({message: 'Registro Guardado'});
            }

            return res.status(200).send({
                register
            });
        });
        */