'use strict'
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');


module.exports = function(req, res, next){
    if(req.path != '/login' && req.path != '/save-register'){ 
        
        console.log(req.headers.authorization); 
        console.log(req.headers); 
        if(req.headers.authorization){
            let token= req.headers.authorization.split(' ')[1] //se hace split para obtener el token ya que viene el [Bearer token]
            //console.log(req.headers.authorization);
            jwt.verify(token, CONFIG.SECRET_TOKEN, function(error, decoded){  //decoded es el payload del token
                if(error) return res.status(403).send({mesage:"No tienes los permisos suficientes para ingresar a esta seccion",error});
                    if(req.method != 'GET'){
                        if(decoded.role == 'admin') next();
                        else res.status(403).send({mesage:"No tienes los permisos suficientes para ingresar a esta seccion",error});
                    }else{
                        next();
                    };
            });
            
        }else res.status(403).send({message: 'No tienes los permisos'});
    }else next();
}   