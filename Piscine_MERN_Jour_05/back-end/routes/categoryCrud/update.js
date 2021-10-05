const express = require('express');
const {Category, Validate} = require('../../models/category');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const id =  req.params.id;

  const category = await Category.findOne({_id: id});
  res.json(category);
});

router.post('/:id', async (req, res) => {
  const id = req.params.id;
  const category = await Category.findOne({_id: id});

  const {error} = Validate(req.body);

  if (error) {
    return res.status(400).json( error.details[0].message, category);
  }

  if (!category) {
    return res.status(400).json('Category does not exist', category);
  } else {

    await Category.findOneAndUpdate({_id: id}, {
      name: req.body.name,
    });

    return res.status(400).json('Category update', req.body.name);
  }
});


module.exports = router;
