const express = require('express');
const {User, ValidateUpdate} = require('../../../models/user');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const id =  parseInt(req.params.id);

  const user = await User.findOne({id});
  res.render('admin/user/editUser', {user});
});

router.post('/:id', async (req, res) => {
  const {error} = ValidateUpdate(req.body);

  if (error) {
    req.flash('danger', error.details[0].message);
    return res.status(400).render('admin/user/editUser');
  }
  const id =  parseInt(req.params.id);
  const user = await User.findOne({id});

  if (!user) {
    req.flash('danger', 'User does not existexists.');
    return res.status(400).render('admin/user/editUser');
  } else {
    const admin = req.body.admin === 'true';

    await User.findOneAndUpdate({id}, {
      login: req.body.login,
      email: req.body.email,
      admin: admin,
    });

    req.flash('info', `Les informations ont été modifiées pour : ${req.body.login} !`);

    res.writeHead(302, {'Location': '/admin/user'});
    res.end();
  }
});


module.exports = router;
