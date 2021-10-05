var express = require('express');
const fs = require('fs');

var config = require('./config');
var app = express();

app.get('/', function (req, res) {
    fs.readFile('./template/index.html',"utf8",(err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)
        res.send(data);

    });
});

app.listen(config.port, function () {
    console.log(` http://${config.host}:${config.port} !`);
});
