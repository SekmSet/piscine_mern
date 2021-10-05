const express = require('express');
const sha1 = require('sha1');
const {User, ValidateUpdateProfil} = require('../../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  const id =  parseInt(req.session.user.id);

  const user = await User.findOne({id});
  res.render('auth/edit', {user});
});

router.post('/', async (req, res) => {
  const {error} = ValidateUpdateProfil(req.body);
  const id =  parseInt(req.session.user.id);
  const user = await User.findOne({id});

  if (error) {
    req.flash('danger', error.details[0].message);
    return res.status(400).render('auth/edit', {user});
  }

  if (!user) {
    req.flash('danger', 'User does not exist.');
    return res.status(400).render('auth/edit', {user});
  } else {
    const userEdit = {
      login: req.body.login,
      email: req.body.email,
    };

    if(req.body.password !=='') {
      userEdit.password = sha1(req.body.password);
    }

    await User.findOneAndUpdate({id}, userEdit);

    req.flash('info', `Les informations ont été modifiées pour : ${req.body.login} !`);
    res.writeHead(302, {'Location': '/profil'});
    res.end();
  }
});

module.exports = router;
