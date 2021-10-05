const express = require('express');
const {User} = require('../../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;