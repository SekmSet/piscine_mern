const express = require('express');
const {User} = require('../../models/user');
const router = express.Router();

router.post('/', async (req, res) => {

  const id =  parseInt(req.session.user.id);
  const user = await User.findOne({id});

  if (!user) {
    req.flash('danger', 'User does not exist.');
    return res.status(400).render('auth/profil', {user});
  } else {
    await User.findOneAndDelete({id},);

    req.flash('info', `Utilisateur supprimé : ${req.body.login} !`);

    res.writeHead(302, {'Location': '/logout'});
    res.end();
  }
});


module.exports = router;
