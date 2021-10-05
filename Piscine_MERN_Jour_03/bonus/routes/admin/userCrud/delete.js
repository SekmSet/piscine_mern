const express = require('express');
const {User} = require('../../../models/user');
const router = express.Router();

router.post('/:id', async (req, res) => {

  const id =  parseInt(req.params.id);
  const user = await User.findOne({id});

  if (!user) {
    req.flash('danger', 'User does not exist.');
    return res.status(400).render('admin/user/index');
  } else {
    await User.findOneAndDelete({id},);

    req.flash('info', `Utilisateur supprimé : ${req.body.login} !`);

    res.writeHead(302, {'Location': '/admin/user'});
    res.end();
  }
});


module.exports = router;
