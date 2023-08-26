const express = require('express');
var routerMediciones = express.Router();
var pool = require('../../mysql-connector');

// API to list device measurement by its ID
// Response code: 200 if OK, 400 on error while reading data from DB
routerMediciones.get('/:id', function (req, res) {
    let deviceID = req.params.id;
    let query = 'Select * from Mediciones where dispositivoId=? order by fecha desc';
    pool.query(query, [deviceID], (err, data) => {
        if (err) {
            console.error(err);
            res.send(("Error listing measures for device " + deviceID ).status(400))
            return;
        }
        console.log(data);
        res.send(JSON.stringify(data[0])).status(200);
    });
});

// API to list all measures for a specific device.
//  Response code: 200 if OK, 400 on error while reading data from DB
routerMediciones.get('/:id/all', function (req, res) {
    let deviceID = req.params.id;
    let query = 'Select * from Mediciones where dispositivoId=? order by fecha desc';
    pool.query(query, [deviceID], (err, data) => {
        if (err) {
            console.error(err);
            res.send(("Error listing measures for device " + deviceID ).status(400))
            return;
        }
        console.log(data);
        res.send(JSON.stringify(data)).status(200);
    });
});


// API to add a measure into a device
// Response code: 200 if OK, 400 on error while writing data to the DB
routerMediciones.post('/add', function(req, res) {
    console.log('DEBUG:  Add Measure: ' + JSON.stringify(req.body));
    pool.query("SET time_zone = '-06:00'");   // THIS NEEDS TO BE FIXED AND SET AS A PARAMETER, OR GENERAL VARIABLE
    pool.query('Insert into Mediciones (fecha,valor,dispositivoId) values (?,?,?)', [req.body.fecha, req.body.valor, req.body.dispositivoId], function(err, result, fields) {
        if (err) {
            console.error(err);
            res.send("Error while adding a new measurement").status(400);
            return;
        }
        res.send(result);
    });
});

// Module Export for user on Main module
module.exports = routerMediciones;
