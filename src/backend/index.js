//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app = express();
var pool = require('./mysql-connector');

//CORS Config
var corsConfig = {
    origin: '*',
    optionSuccessStatus:200
}

//CORS Setup
const cors = require('cors');

// Router variables
const routerDispositivo = require('./routes/dispositivo')
const routerMediciones = require('./routes/mediciones')
const routerRiegos = require('./routes/riegos')

// A logger that shows the correct initialization of the application
const myLogger = function(req, res, next) {
    console.log(req.method + " - " + req.url + " - " + new Date());   
    next();
}

app.use(myLogger)

// to parse application/json
app.use(express.json()); 

// to serve static files
app.use(express.static('/home/node/app/static/'));

//Middleware CORS
app.use(cors(corsConfig));

app.use('/dispositivos', routerDispositivo)
app.use('/mediciones', routerMediciones)
app.use('/logs', routerRiegos)

//=======[ Main module code ]==================================================

app.get('/', function(req, res, next) {
    res.send({'mensaje': 'Hola DAM'}).status(200);
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
