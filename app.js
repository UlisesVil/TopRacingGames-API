//Este archivo es un modulo de Node JS exportable

//Aqui se guarda toda la configuracion de Express y 
//las peticiones de Body-Parser

'use strict'

var express = require('express');  //cuando se hace un require de un modulo, se accede al directorio de nodemodules y a la carpeta de la libreria para cargar el objeto correspondiente
var bodyParser = require('body-parser');

var app = express();


//Cargar archivos de rutas
var auth_routes = require('./routes/auth');
var project_routes = require('./routes/project');
var comment_routes = require('./routes/comment');

/*//Revisar el funcionamiento del los headers Authorization y ContentType
  //enviados del frontend al backend
var AuthToken = require('./middelwares/authToken');
app.use('/api', AuthToken); //antes de cualquier ruta se ejecutara el middelware
*/


// Middlewares es una capa o metodos que se ejecuta antes de la accion de un controlador
app.use(bodyParser.urlencoded({extended:false})); //configuracion necesaria para body-parser
app.use(bodyParser.json());//esto le indica que cualquier tipo de peticion que llegue por el body de la peticion lo tiene que convertir a json


//CORS
//Esta es una Middleware y permite el acceso cruzado entre dominios
//Activa el acceso cors y configurar las cabeceras y tener el minimo 
//de problemas posibles al realizar peticiones AJAX al backend
// Configurar cabeceras y cors 


app.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//Rutas
app.get('/',(req, res)=>{
    res.status(200).send(
        `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Racing Games Site</title>
            <link rel="icon" type="image/x-icon" href="http://www.espaciosmail.com.mx/assets/images/favicon.ico/ms-icon-310x310.png">
            <style>
                body{
                    background:#181818;
                    color: white;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
                .content{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    width:90%;
                    margin: auto;
                    text-align: center;
                }
                img{
                    width:20%;
                    min-width:200px;
                    margin-top:30px;
                }
                a{
                    text-decoration:none;
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


//Exportar
module.exports = app; //para usarla en el archivo index.js













//Rutas
/* //Ejemplo de como hacer POST y GET en Postman
app.use('/', project_routes);



app.get('/', (req, res)=>{    //en el navegador ahora la ruta http://localhost:3700/ ahora esta disponible con el mensaje introducido
    res.status(200).send(     //en el programa postman pegando la url y seleccionando get podemos obtener estos datos 
       "<h1>Pagina de Inicio</h1>"
    );
});
app.post('/test/:id', (req, res)=>{    //en el navegador ahora la ruta http://localhost:3700/test ahora esta disponible con el mensaje introducido si colocamos metodo get, si lo cambiamos por post la respuesta la obtenemos con postman en la terminal
    console.log(req.body.nombre);               //nos devuelve en consola la respuesta enviada por postman en este caso el nomble introducido en campo nombre en body y en la opcion x-www-form-urlencoded Key = nombre y value = Ulises
    console.log(req.query.web);    //al escribir http://localhost:3700/test/88?web=youtube.com en postman y lanzar el POST en consola obtenemos la direccion web youteube.com
    console.log(req.params.id);    //al escribir http://localhost:3700/test/88?web=youtube.com en postman y lanzar el POST en consola obtenemos la id con numero 88
    res.status(200).send({          //en el programa postman pegando la url y seleccionando post podemos obtener estos datos 
        message: "Hola Mundo desde mi API de NodeJS"
    });
});
*/