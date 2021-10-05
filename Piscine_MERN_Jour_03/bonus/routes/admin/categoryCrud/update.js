const express = require('express');
const {Category, Validate} = require('../../../models/categories');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const id =  req.params.id;

  const category = await Category.findOne({_id: id});
  res.render('admin/category/edit', {category});
});

router.post('/:id', async (req, res) => {
  const id = req.params.id;
  const category = await Category.findOne({_id: id});

  const {error} = Validate(req.body);

  if (error) {
    req.flash('danger', error.details[0].message);
    return res.status(400).render('admin/category/edit', {category});
  }


  if (!category) {
    req.flash('danger', 'Category does not existexists.');
    return res.status(400).render('admin/category/edit', {category});
  } else {

    await Category.findOneAndUpdate({_id: id}, {
      name: req.body.name,
    });

    req.flash('info', `Les informations ont été modifiées pour : ${req.body.name} !`);

    res.writeHead(302, {'Location': '/admin/category'});
    res.end();
  }
});


module.exports = router;
