const express = require('express');
const {Category} = require('../../models/category');
const router = express.Router();

router.post('/:id', async (req, res) => {

  const id =  req.params.id;
  const category = await Category.findOne({_id: id});

  if (!category) {
    return res.status(400).json('Category does not exist');
  } else {
    await Category.findOneAndDelete({_id: id},);

    return res.status(200).json('Category delete');
  }
});

module.exports = router;
