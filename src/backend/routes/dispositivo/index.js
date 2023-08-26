const express = require('express')
const routerDispositivo = express.Router()
var pool = require('../../mysql-connector');

//API to get and list all the devices from DB ("Dispositivo" Table)
//Response code: 200 if OK, 400 on error
routerDispositivo.get('/', function(req, res) {
    pool.query('Select * from Dispositivos', function(err, result, fields) {
        if (err) {
            console.error(err);
            res.send(err).status(400);
            return;
        }
        console.log(result);
        res.send(JSON.stringify(result)).status(200);
    });
});

// API to get a specific device by its ID
// Response code: 200 if OK, 400 on error
routerDispositivo.get('/:id', function (req, res) {
    pool.query('SELECT * FROM Dispositivos WHERE dispositivoId =?', [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.send(("Device not found").status(400))
            return;
        }
        console.log(result[0]);
        res.send(JSON.stringify(result[0])).status(200);
    });
});

// API to delete a specific device with by its ID
// Response code: 200 if OK, 400 on error while reading data from DB
routerDispositivo.delete('/:id', function (req, res) {
    let deviceID = req.params.id;
    pool.query('DELETE from Dispositivos WHERE dispositivoId  = ' + deviceID, (err, response) => {
        if (err) {
            console.error(err);
            res.send(("Error while deleting device " + deviceID).status(400))
            return;
        }
        res.send(("Deleted device " + deviceID).status(200));
    });
});

module.exports = routerDispositivo;