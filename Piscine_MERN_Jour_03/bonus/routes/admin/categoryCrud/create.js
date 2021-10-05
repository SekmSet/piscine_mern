const express = require('express');
const {Category, Validate} = require('../../../models/categories');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/category/create');
});

router.post('/', async (req, res) => {

  const category = await Category.findOne({name: req.body.name});
  const {error} = Validate(req.body);

  if (error) {
    req.flash('danger', error.details[0].message);
    return res.status(400).render('admin/category/create');
  }

  if (category) {
    req.flash('danger', 'Category allready exists.');
    return res.status(400).render('admin/category/create');
  } else {
    const categoryNew = new Category({
      name: req.body.name,
    });

    await categoryNew.save();
    req.flash('info', `Votre catégorie a été créé ${req.body.name} !`);

    res.writeHead(302, {'Location': '/admin/category'});
    res.end();
  }

});

module.exports = router;
