const express = require('express');
const {Category} = require('../../models/categories');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/category/create');
});

router.post('/', async (req, res) => {

  const category = await Category.findOne({name: req.body.name});

  if (category) {
    req.flash('danger', 'Category allready exists.');
    return res.status(400).render('admin/add/category');
  } else {
    const categorieNew = new Category({
      name: req.body.name,
    });

    await categorieNew.save();
    req.flash('info', `Votre catégorie a été créé ${req.body.name} !`);

    res.writeHead(302, {'Location': '/admin'});
    res.end();
  }



});

module.exports = router;
