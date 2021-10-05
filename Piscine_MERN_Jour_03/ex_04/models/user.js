const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  id: {
    type: Number,
  },
  login: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  admin: {
    type: Boolean,
  },
}));

function validateUser (user) {
  const schema = Joi.object({
    id: Joi.number().integer(),
    login: Joi.string()
      .min(5)
      .max(20)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    passwordConfirm: Joi.ref('password'),
    admin: Joi.boolean()
  })
    .with('password', 'passwordConfirm');

  return schema.validate(user);
}

module.exports = {
  User: User,
  Validate: validateUser
};
