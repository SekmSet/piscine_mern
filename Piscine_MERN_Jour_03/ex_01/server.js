const express = require('express');
const router = express.Router();

const app = express();

app.use('/', router);

router.get('/', function (req, res) {
  res.send('hello');
});

app.listen(4242, function () {
  console.log('http://localhost:4242');
});