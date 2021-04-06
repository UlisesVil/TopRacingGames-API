'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3700;

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/portafolio')
mongoose.connect('**conection whith password to MongoDB Atlas**')
    .then(()=>{
        console.log('Connection to the Database successfully established in MongoDB Atlas');
        //console.log('Connection to the Database successfully established in MongoDB Local');

        app.listen(port, ()=> {
            console.log("Server running correctly on https://backend-mean-stack.herokuapp.com");
            //console.log("Server running correctly on http://127.0.0.1:" + process.env.PORT );
        });
    })
.catch(err=> console.log(err));
        
//mongoose.connect("mongodb://localhost/portafolio", {
mongoose.connect("**conection whith password to MongoDB Atlas**", {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});