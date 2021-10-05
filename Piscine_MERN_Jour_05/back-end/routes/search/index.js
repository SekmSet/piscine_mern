const express = require('express');
const {Blog} = require('../../models/blog');
const router = express.Router();

router.get('/', async (req, res) => {

  const searchByTitle = req.query.searchByTitle;
  const searchByResum = req.query.searchByResum;
  const query = {};

  if (searchByTitle !== undefined &&  searchByTitle !== '') {
    query['title'] = { '$regex': searchByTitle, '$options': 'i' };
  }
  if (searchByResum !== undefined &&  searchByResum !== '') {
    query['resum'] = { '$regex': searchByResum, '$options': 'i' };
  }

  const results = await Blog.find(query).populate('user').populate('categories');
  res.json(results);
});

module.exports = router;
