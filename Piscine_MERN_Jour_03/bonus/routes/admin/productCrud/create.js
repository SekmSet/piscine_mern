const express = require('express');
const {Product, Validate} = require('../../../models/products');
const {Category} = require('../../../models/categories');

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.find();

  res.render('admin/product/create', {categories});
});

router.post('/', async (req, res) => {
  console.log(req.file.path);
  const categories = await Category.find();

  const {error} = Validate(req.body);
  if (error) {
    req.flash('danger', error.details[0].message);
    return res.status(400).render('admin/product/create', {categories});
  }

  const product = await Product.findOne({title: req.body.title});

  if (product) {
    req.flash('danger', 'Product allready exists.');
    return res.status(400).render('admin/product/create', {categories});
  } else {
    const last_product = await Product.findOne().sort({$natural: -1});
    const id = last_product === null ? 1 : last_product.id + 1;

    const produit = new Product({
      id: id,
      title: req.body.title,
      price: req.body.price,
      resum: req.body.resum,
      category: req.body.category,
      image: req.file.path,
    });

    await produit.save();
    req.flash('info', `Votre produit a été créé ${req.body.name} !`);

    res.writeHead(302, {'Location': '/admin/product'});
    res.end();
  }
});

module.exports = router;
