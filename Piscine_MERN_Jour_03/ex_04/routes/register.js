const express = require('express');
const sha1 = require('sha1');
const {User, Validate} = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('auth/register');
});

router.post('/', async (req, res) => {
  const {error} = Validate(req.body);
  if (error) {
    req.flash('danger', error.details[0].message);
    return res.status(400).render('auth/register');
  }

  let user = await User.findOne({email: req.body.email});

  if (user) {
    req.flash('danger', 'User allready exists.');
    return res.status(400).render('auth/register');
  } else {
    const last_user = await User.findOne().sort({$natural: -1});
    const id = last_user === null ? 1 : last_user.id + 1;

    user = new User({
      id: id,
      login: req.body.login,
      email: req.body.email,
      password: sha1(req.body.password),
      admin: false,
    });
    await user.save();
    req.flash('info', `Welcome ${req.body.login} !`);
    req.session.user = user;

    res.writeHead(302, {'Location': '/'});
    res.end();    
  }
});

module.exports = router;