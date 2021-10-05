const express = require('express');
const {Category} = require('../../../models/categories');
const router = express.Router();

router.post('/:id', async (req, res) => {

  const id =  req.params.id;
  const category = await Category.findOne({_id: id});

  if (!category) {
    req.flash('danger', 'Category does not exist.');
    return res.status(400).render('admin/category/index');
  } else {
    await Category.findOneAndDelete({_id: id},);

    req.flash('info', 'Catégorie supprimé !');

    res.writeHead(302, {'Location': '/admin/category'});
    res.end();
  }
});

module.exports = router;
