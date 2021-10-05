const express = require('express');
const Joi = require('@hapi/joi');
const sha1 = require('sha1');
const {User} = require('../../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {

  const {error} = validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  const user = await User.findOne({login: req.body.login});

  if (!user) {
    return res.status(400).json({
      error: 'Login invalide.'
    });
  }

  if (sha1(req.body.password) !== user.password) {
    return res.status(400).json({
      error: 'Password invaldie.'
    });
  }

  // create jwt
  const accessTokenSecret = 'jesuisunelicornemagique';
  const token = jwt.sign({
    login: user.login,
    admin: user.admin,
    _id: user._id,
    id: user.id,
  }, accessTokenSecret);

  return res.status(200).json({
    message: 'Welcome',
    token: token
  });

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
