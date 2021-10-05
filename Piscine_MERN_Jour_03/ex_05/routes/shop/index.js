const express = require('express');
const {Product} = require('../../models/products');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();

  res.render('shop/index', {products});
});

router.get('/:id', async (req, res) => {

  const id = parseInt(req.params.id);
  const product = await Product.findOne({id}).populate('category');
  res.render('shop/show', {product});
  res.end();
});

module.exports = router;
