const express = require('express');
const fs = require('fs');

const config = require('./config');
const app = express();
const router = express.Router();

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

        let  age='';

        if(req.query.age === undefined) {
             age = ', i dont know your age';
        } else {
             age = `, you have ${req.query.age} yo`;
        }

        res.send(data.replace('{{nom}}',req.params.name).replace('{{age}}',age));
    });
});

app.use("/",router);

app.listen(config.port, function () {
    console.log(` http://${config.host}:${config.port} !`);
});
