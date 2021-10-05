const express = require('express');
const Joi = require('@hapi/joi');
const sha1 = require('sha1');
const {User} = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('auth/login');
});

router.post('/', async (req, res) => {

  const {error} = validate(req.body);

  if (error) {
    req.flash('danger', error.details[0].message);
    return res.status(400).render('auth/login');
  }

  const user = await User.findOne({login: req.body.login});

  if (!user) {
    req.flash('danger', 'Login invalide.');
    return res.status(400).render('auth/login');
  }

  if (sha1(req.body.password) !== user.password) {
    req.flash('danger', 'Password invaldie.');
    return res.status(400).render('auth/login');
  }
  req.flash('info', `Welcome ${req.body.login} !`);
  req.session.user = user;

  res.writeHead(302, {'Location': '/'});
  res.end();
});

function validate (req) {
  const schema = Joi.object({
    login: Joi.string()
      .min(5).max(20).required(),

    password: Joi.string()
      .min(5).max(255)
      .required()
  });
  return schema.validate(req);
}

module.exports = router;
