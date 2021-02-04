'use strict'

const User = require('../models/register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');


var controller ={
/*
    login: function(req, res){
        let email= req.params.email;
        //let password= req.params.password;
        console.log(email);
        User.findOne({email: email});
    }
*/
    login: function(req, res){
        var login = new User();
        var params = req.body;

        login.email= params.email;
        login.password= params.password;
        //console.log(login.email);
        //console.log(login.password);
        //console.log(params);
        const query={email: login.email};

        if(login.email==null) return res.status(404).send({message:'El registro no Existe'});


        User.findOne(query)
            .then(user=>{

                if(!user) return res.status(404).send({message:'El Registro no existe'});

                bcrypt.compare(login.password, user.password)
                    .then(match=>{
                        if(match){
                            let payload = {
                                email: user.email,
                                name: user.name,
                                lastName: user.lastName,
                                role: user.role
                            }
                            jwt.sign(payload,CONFIG.SECRET_TOKEN, function(error, token){
                                if(error){
                                    res.status(500).send({error});
                                }else{
                                    res.status(200).send({message: 'Access Granted', token, payload});
                                }
                            });
                        }else{
                            res.status(200).send({message: 'Wrong Password'});
                        }
                    }).catch(error=> {
                        console.log(error);
                        res.status(500).send({error});
                    });

            }).catch(error => {
                console.log(error);
                res.status(500).send({error});
            });
    } 











};

module.exports = controller;



/*
const query={email: login.email};

if(login.email==null) return res.status(404).send({message:'El registro no Existe'});

        User.findOne(query, (err, user)=>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!user) return res.status(404).send({message:'El Registro no existe'});

            bcrypt.compare(login.password, user.password)
                  .then(match=>{
                      if(match) return res.status(200).send({message: 'Acces Granted'});
                      return res.status(200).send({message: 'Wrong Password'});
                  }).catch(error=> {
                      console.log(error);
                      res.status(500).send({error});
                  });

            return res.status(200).send({
                user           
            });

           
            
        }).catch(error => {
            console.log(error);
            res.status(500).send({error});
        });
*/