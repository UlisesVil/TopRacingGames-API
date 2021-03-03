'use strict'

var mongoose = require('mongoose');
var app = require('./app');//no hace falta poner extencion js
var port = process.env.PORT || 3700; //numero del puerto que utilizara nuestro proyecto

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/portafolio')
mongoose.connect('mongodb+srv://UlisesVil:Odaiba99*@dbapinodejs.1xodm.mongodb.net/dbapinodejs?retryWrites=true&w=majority')
        .then(()=>{
            //console.log('Conexion a la Base de Datos establecida satisfactoriamente en MongoDB Atlas');
            console.log('Conexion a la Base de Datos establecida satisfactoriamente en MongoDB Local');
        
            //creacion del servidor
            app.listen(port, ()=> {
                //console.log("Servidor corriendo correctamente en la url https://backend-mean-stack.herokuapp.com");
                console.log("Servidor corriendo correctamente en el puerto 3700");
            });
        
        })
        .catch(err=> console.log(err));
        //Usar en la consola dentro de la carpeta del proyecto el 
        //comando $npm start para comprobar que se conecto a la base de datos de Mongo DB
        
     
//Con esto se arregla el proble del error Deprecated "Portfolio es el nombre de tu base de datos"
        //mongoose.connect("mongodb://localhost/portafolio", {
        mongoose.connect("mongodb+srv://UlisesVil:Odaiba99*@dbapinodejs.1xodm.mongodb.net/dbapinodejs?retryWrites=true&w=majority", {
            
            keepAlive: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
     