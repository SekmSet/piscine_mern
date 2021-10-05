const express = require('express');
const {Category} = require('../../../models/categories');
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.render('admin/category/index', {categories});
});

module.exports = router;
