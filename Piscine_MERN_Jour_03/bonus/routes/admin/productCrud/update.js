const express = require('express');
const {Product, Validate} = require('../../../models/products');
const {Category} = require('../../../models/categories');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const id =  parseInt(req.params.id);
  const product = await Product.findOne({id});

  const categories = await Category.find();

  res.render('admin/product/edit', {product, categories });
});

router.post('/:id', async (req, res) => {
  const id =  parseInt(req.params.id);
  const product = await Product.findOne({id});
  const categories = await Category.find();

  const {error} = Validate(req.body);
  if (error) {
    req.flash('danger', error.details[0].message);
    return res.status(400).render('admin/product/edit', {product, categories });
  }

  if (!product) {
    req.flash('danger', 'Product not found does not exist.');
    return res.status(400).render('admin/product/edit',  {product, categories });
  } else {

    const articleupdate= {
      title: req.body.title,
      price: req.body.price,
      resum: req.body.resum,
      category: req.body.category,
    };

    if(req.file !== undefined && req.file.path !== '' ) {
      articleupdate.image = req.file.path;
    }

    await Product.findOneAndUpdate({id}, articleupdate);

    req.flash('info', `Les informations ont été modifiées pour : ${req.body.title} !`);

    res.writeHead(302, {'Location': '/admin/product'});
    res.end();
  }
});


module.exports = router;
