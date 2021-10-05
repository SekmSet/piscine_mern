const express = require('express');
const {Product, Validate} = require('../../models/products');
const {Category} = require('../../models/categories');
const router = express.Router();

router.get('/', async (req, res) => {

  const categories = await Category.find();
  res.render('admin/product/create', {categories});
});

router.post('/', async (req, res) => {

  const {error} = Validate(req.body);
  if (error) {
    req.flash('danger', error.details[0].message);
    res.writeHead(302, {'Location': '/admin/add/product'});
    return res.end();
  }

  let product = await Product.findOne({title: req.body.title});

  if (product) {
    req.flash('danger', 'Product allready exists.');
    res.writeHead(302, {'Location': '/admin/add/product'});
    return res.end();
  } else {
    const last_product = await Product.findOne().sort({$natural: -1});
    const id = last_product === null ? 1 : last_product.id + 1;

    const category = await Category.findOne({name: req.body.category} );
    if (!category) {
      req.flash('danger', 'Category Invalide.');
      res.writeHead(302, {'Location': '/admin/add/product'});
      return res.end();
    }

    product = new Product({
      id: id,
      title: req.body.title,
      price: req.body.price,
      resum: req.body.resum,
      category: category._id,
    });
    await product.save();
    req.flash('info', `Votre produit a été ajouté ${req.body.title} !`);
    res.writeHead(302, {'Location': '/admin'});
    res.end();
  }
});

module.exports = router;
