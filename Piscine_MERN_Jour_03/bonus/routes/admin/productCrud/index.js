const express = require('express');
const {Product} = require('../../../models/products');
const router = express.Router();

router.get('/', async (req, res) => {
  const sort = {};
  if (req.query.order !== undefined && req.query.field !== undefined && req.query.order !== ''&&  req.query.field !== '') {
    sort[req.query.field] = req.query.order ;
  }

  const query = {};
  if (req.query.title !== undefined &&  req.query.title !== '') {
    query['title'] = { '$regex': req.query.title, '$options': 'i' };
  }
  if (req.query.resum !== undefined &&  req.query.resum !== '') {
    query['resum'] = { '$regex': req.query.resum, '$options': 'i' };
  }

  const products = await Product.find(query).sort(sort);
  res.render('admin/product/index', {products, query, sort});
});

module.exports = router;
