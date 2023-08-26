const express = require('express');
var routerRiegos = express.Router();
var pool = require('../../mysql-connector');

// API to get the last device status for an electrovalve by its ID
// Response code: 200 if OK, 400 on error while reading data from DB
routerRiegos.get('/:id', function (req, res) {
    let electrovalvulaId = req.params.id;
    let query = 'Select * from Log_Riegos where electrovalvulaId=? order by fecha desc';
    pool.query(query, [electrovalvulaId], (err, data) => {
        if (err) {
            console.error(err);
            res.send(("Error reading logs for valve  " + electrovalvulaId ).status(400))
            return;
        }
        console.log(data[0]);
        res.send(JSON.stringify(data[0])).status(200);
    });
});

// List historical valve status
// Response code: 200 if OK, 400 on error while reading data from DB
routerRiegos.get('/:id/all', function (req, res) {
    let electrovalvulaId = req.params.id;
    let query = 'Select * from Log_Riegos where electrovalvulaId=? order by fecha desc';
    pool.query(query, [electrovalvulaId], (err, data) => {
        if (err) {
            console.error(err);
            res.send(("Error reading logs for valve " + electrovalvulaId ).status(400))
            return;
        }
        console.log(data);
        res.send(JSON.stringify(data)).status(200);
    });
});

// API to write an event with an electrovalve status
// Response code: 200 if OK, 400 on error while writing data to the DB
routerRiegos.post('/add', function(req, res) {
    console.log('DEBUG:  Add LogRiego: ' + JSON.stringify(req.body));
    pool.query('Insert into Log_Riegos (apertura,fecha,electrovalvulaId) values (?,?,?)', [req.body.estado, req.body.fecha, req.body.electrovalvulaId], function(err, result, fields) {
        if (err) {
            console.error(err);
            res.send("Error while adding a new log for valve:" + req.body.electrovalvulaId ).status(400);
            return;
        }
        res.send(result);
    });
});

// Module Export for user on Main module
module.exports = routerRiegos;
