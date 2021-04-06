'use strict'

const User = require('../models/register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

var controller ={

    login: function(req, res){
        var login = new User();
        var params = req.body;
        login.email= params.email;
        login.password= params.password;
        const query={email: login.email};

        if(login.email==null) return res.status(404).send({message:'User registration does not exist'});
        User.findOne(query)
            .then(user=>{
                if(!user) return res.status(404).send({message:'User registration does not exist'});
                bcrypt.compare(login.password, user.password)
                    .then(match=>{
                        if(match){
                            let payload = {
                                id: user._id,
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