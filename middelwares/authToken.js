'use strict'

const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = function(req, res, next){
    if(req.path != '/login' && req.path != '/save-register'){
        if(req.headers.authorization){
            let token= req.headers.authorization.split(' ')[1];
            jwt.verify(token, CONFIG.SECRET_TOKEN, function(error, decoded){
                if(error) return res.status(403).send({mesage:"You do not have sufficient permissions to enter this section",error});
                if(req.method != 'GET'){
                    if(decoded.role == 'admin') next();
                    else res.status(403).send({mesage:"You do not have sufficient permissions to enter this section",error});
                }else{
                    next();
                };
            });
        }else res.status(403).send({message: 'You don\'t have the permissions'});
    }else next();
}   