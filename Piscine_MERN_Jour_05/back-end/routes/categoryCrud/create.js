const express = require('express');
const {Category, Validate} = require('../../models/category');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/category/create');
});

router.post('/', async (req, res) => {

  const category = await Category.findOne({name: req.body.name});
  const {error} = Validate(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  if (category) {

    return res.status(400).json('Category allready exists.');
  } else {
    const categoryNew = new Category({
      name: req.body.name,
    });

    await categoryNew.save();

    return res.status(200).json({
      error: 'Category save.'
    });
  }
});

module.exports = router;
