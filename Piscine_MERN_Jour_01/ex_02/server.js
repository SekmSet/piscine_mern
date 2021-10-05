var express = require('express');
var config = require('./config');
var app = express();

app.get('/', function (req, res) {
    res.send('Great ! It works.');
});

app.listen(config.port, function () {
    console.log(` http://${config.host}:${config.port} !`);
});

// console.log(config);