const express = require('express');
const {Product, Validate} = require('../../models/products');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/create');
});

router.post('/', async (req, res) => {

  const {error} = Validate(req.body);
  if (error) {
    req.flash('danger', error.details[0].message);
    return res.status(400).render('admin/create');
  }

  let product = await Product.findOne({title: req.body.title});

  if (product) {
    req.flash('danger', 'Product allready exists.');
    return res.status(400).render('admin/create');
  } else {
    const last_product = await Product.findOne().sort({$natural: -1});
    const id = last_product === null ? 1 : last_product.id + 1;

    product = new Product({
      id: id,
      title: req.body.title,
      price: req.body.price,
      resum: req.body.resum,
    });
    await product.save();
    req.flash('info', `Votre produit a été ajouté ${req.body.title} !`);
    res.writeHead(302, {'Location': '/admin'});
    res.end();
  }
});

module.exports = router;
