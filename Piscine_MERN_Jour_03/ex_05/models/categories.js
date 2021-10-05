const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true
  },
}));

function validateCategory (category) {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(20)
      .required(),
  });
  return schema.validate(category);
}

module.exports = {
  Category: Category,
  Validate: validateCategory
};
