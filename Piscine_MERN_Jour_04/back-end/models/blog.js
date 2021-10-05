const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Blog = mongoose.model('Blog', new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
    unique: true
  },
  resum: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    body: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
}, { timestamps: true }));

function Validate (blog) {
  const schema = Joi.object({
    id: Joi.number().integer(),
    title: Joi.string()
      .min(5)
      .max(30)
      .required(),
    resum: Joi.string()
      .min(5)
      .max(500)
      .required(),
    user: Joi.string(),
    comment: Joi.string(),
  });
  return schema.validate(blog);
}

module.exports = {
  Blog,
  Validate
};
