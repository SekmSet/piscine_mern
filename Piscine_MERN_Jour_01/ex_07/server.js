const express = require('express');
const myMERN_module = require ('./myMERN_module');
const config = require('./config');
const app = express();
const router = express.Router();

router.get('/', function (req, res) {
    res.send('ok');
});

router.get('/files/:name', function (req, res, next) {
    const result = myMERN_module.read(req.params.name);

    result.then(function(result) {
        res.send(result);
    }, function(err) {
        res.send(err);
    });
});

router.post('/files/:name', function (req, res, next) {
    const result = myMERN_module.create(req.params.name);

    result.then(function(result) {
        res.send(result);
    }, function(err) {
        res.send(err);
    });
});

router.put('/files/:name/:content', function (req, res, next) {
    const result = myMERN_module.update(req.params.name, req.params.content);

    result.then(function(result) {
        res.send(result);
    }, function(err) {
        res.send(err);
    });
});

router.delete('/files/:name', function (req, res, next) {
    const result = myMERN_module.delete(req.params.name);

    result.then(function(result) {
        res.send(result);
    }, function(err) {
        res.send(err);
    });});

app.use("/",router);

app.listen(config.port, function () {
    console.log(` http://${config.host}:${config.port} !`);
});
