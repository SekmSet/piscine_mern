var express = require('express');
const fs = require('fs');

var config = require('./config');
var app = express();
var router = express.Router();

router.get('/', function (req, res) {
    fs.readFile('./template/index.html',"utf8",(err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.send(data);
    });
});

router.get('/name/:name?', function (req, res, next) {
    fs.readFile('./template/name.html',"utf8",(err, data) => {
        if (err) {
            console.error(err)
            return
        }
        if(req.params.name === undefined) {
            req.params.name = 'unknown';
        }

        res.send(data.replace('{{nom}}',req.params.name));
    });
});

app.use("/",router);

app.listen(config.port, function () {
    console.log(` http://${config.host}:${config.port} !`);
});
