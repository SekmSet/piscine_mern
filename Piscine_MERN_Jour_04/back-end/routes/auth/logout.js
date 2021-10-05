const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'You are logout !'
  });
});

module.exports = router;
