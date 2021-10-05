var express = require('express');
var config = require('./config');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(config.port, function () {
    console.log(` http://${config.host}:${config.port} !`);
});

// console.log(config);