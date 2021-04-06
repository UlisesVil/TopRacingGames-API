'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var auth_routes = require('./routes/auth');
var project_routes = require('./routes/project');
var comment_routes = require('./routes/comment');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/',(req, res)=>{
    res.status(200).send(
        `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Racing Games Site</title>
            <link rel="icon" type="image/x-icon" href="https://image.flaticon.com/icons/png/128/946/946995.png">
            <style>
                body{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    background: url(https://i.pinimg.com/originals/b6/d7/7e/b6d77e2fa9a6a61007f3f68eff99d4b9.jpg);
                    background-attachment: fixed;
                    background-position: center;
                    background-size: cover;
                    color: white;
                }
                .content{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    width:90%;
                    border: 3px solid purple;
                    border-radius: 10px;
                    padding-bottom: 20px;
                    margin: auto;
                    text-align: center;
                    text-shadow: 3px 3px 5px black;
                    background: rgba(0,0,0,.8);
                }
                img{
                    width:20%;
                    min-width:200px;
                    margin-top:30px;
                }
                a{
                    text-decoration:none;
                    color: yellowgreen;
                }
                a:hover{
                    color: purple;
                }
            </style>
        </head>
        <body>
            <div class="content">
                <h1 style='color: white;'>Welcome!! This is the API Rest from The MEAN Stack project: Racing Games</h1>
                <h2>You can visit the site here: <a href="http://top-racing-games.mygamesonline.org" target="_blank">Racing Games Site</a></h2>
                <img src="https://media.giphy.com/media/MAjK6dUDas2gKYQdhT/giphy.gif">
            </div>
        </body>`
    );
});

app.use('/api', auth_routes);
app.use('/api', project_routes);
app.use('/api', comment_routes);

module.exports = app;