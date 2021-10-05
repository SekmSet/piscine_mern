const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('auth/profil');
});

module.exports = router;
