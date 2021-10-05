const express = require('express');
const {User} = require('../models/user');

const router = express.Router();


router.get('/', async (req, res) => {
  const user = await User.findOne({id: req.session.user.id});

  res.render('auth/profil', {user});
});

module.exports = router;
