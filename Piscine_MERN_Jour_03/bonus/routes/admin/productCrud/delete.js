const express = require('express');
const {Product} = require('../../../models/products');
const router = express.Router();

router.post('/:id', async (req, res) => {

  const id =  parseInt(req.params.id);
  const product = await Product.findOne({id});

  if (!product) {
    req.flash('danger', 'Product does not exist.');
    return res.status(400).render('admin/product/index');
  } else {
    await Product.findOneAndDelete({id},);

    req.flash('info', 'Produit supprimé !');

    res.writeHead(302, {'Location': '/admin/product'});
    res.end();
  }
});

module.exports = router;
