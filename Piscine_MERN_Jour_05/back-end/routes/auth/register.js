const express = require('express');
const sha1 = require('sha1');
const {User, Validate} = require('../../models/user');
const router = express.Router();

router.post('/', async (req, res) => {

  const {error} = Validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  const userLogin = await User.findOne({login: req.body.login});
  if (userLogin) {
    return res.status(400).json({
      error: 'User login allready exists.'
    });
  }

  const userEmail = await User.findOne({email: req.body.email});
  if (userEmail) {
    return res.status(400).json({
      error: 'User email allready exists.'
    });
  }

  const last_user = await User.findOne().sort({$natural: -1});
  const id = last_user === null ? 1 : last_user.id + 1;

  const user = new User({
    id: id,
    login: req.body.login,
    email: req.body.email,
    password: sha1(req.body.password),
    admin: false,
  });
  await user.save();

  return res.status(200).json({
    message: 'Your account is create',
    user: user
  });
});

module.exports = router;